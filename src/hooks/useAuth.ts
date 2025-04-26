import { useAppContext } from "@/AppProvider";
import { RedirectToRoadmap } from "@/components/common/LoginForm";
import { authApi } from "@/services/authApi";
import { CredentialResponse } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface RegisterData {
	name: string;
	email: string;
	password: string;
}

export const useAuth = (redirectData: RedirectToRoadmap = {}) => {
	const navigate = useNavigate();
	const { auth, setAuth } = useAppContext();

	const loginMutation = useMutation({
		mutationFn: (data: { email: string; password: string }) =>
			authApi.login(data.email, data.password),
		onSuccess: (response) => {
			const { token, ...user } = response.data;
			setAuth(user);
			localStorage.setItem("user", JSON.stringify(user));
			localStorage.setItem("accessToken", token);
			toast.success("Login successful");
			if (redirectData?.from) {
				navigate(redirectData.from, {
					state: {
						from: "/login",
						data: redirectData.data,
					},
				});
			} else {
				navigate("/");
			}
		},
		onError: () => {
			toast.error("Login failed");
		},
	});

	const googleLoginMutation = useMutation({
		mutationFn: (credentialResponse: CredentialResponse) =>
			authApi.googleLogin(credentialResponse),
		onSuccess: (response) => {
			toast.success("Login successful");
			const { token, ...user } = response.data;
			setAuth(user);
			localStorage.setItem("user", JSON.stringify(user));
			localStorage.setItem("accessToken", token);
			if (redirectData?.from) {
				navigate(redirectData.from, {
					state: {
						from: "/login",
						data: redirectData.data,
					},
				});
			} else {
				navigate("/");
			}
		},
		onError: () => {
			toast.error("Login failed");
		},
	});

	const registerMutation = useMutation({
		mutationFn: (data: RegisterData) =>
			authApi.signUp(data.name, data.email, data.password),
		onSuccess: (response) => {
			toast.success("Registration successful");
			const { token, ...user } = response.data;
			setAuth(user);
			localStorage.setItem("user", JSON.stringify(user));
			localStorage.setItem("accessToken", token);
			navigate("/");
		},
	});

	const logOut = async () => {
		try {
			await authApi.logout();
			setAuth(null);
			localStorage.removeItem("user");
			localStorage.removeItem("accessToken");
			toast.success("Logout success.");
			navigate("/");
		} catch (error: unknown) {
			console.error("Logout failed:", error);
			toast.error("Logout failed.");
		}
	};
	return {
		logOut,
		auth,
		googleLogin: googleLoginMutation.mutate,
		login: loginMutation.mutateAsync,
		register: registerMutation.mutateAsync,
		isLoading:
			googleLoginMutation.isPending ||
			registerMutation.isPending ||
			loginMutation.isPending,
	};
};
