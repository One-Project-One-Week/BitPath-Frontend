import { useAppContext } from "@/AppProvider";
import { RedirectToRoadmap } from "@/components/common/LoginForm";
import { authApi } from "@/services/authApi";
import { CredentialResponse } from "@react-oauth/google";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";

interface RegisterData {
	name: string;
	email: string;
	password: string;
}

export const useAuth = (redirectData: RedirectToRoadmap = {}) => {
	const navigate = useNavigate();
	const { auth, setAuth, profile, setProfile } = useAppContext();

	const googleLoginMutation = useMutation({
		mutationFn: (credentialResponse: CredentialResponse) =>
			authApi.googleLogin(credentialResponse),
		onSuccess: (response) => {
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
		onError: (error) => {
			console.log(error);
		},
	});

	const registerMutation = useMutation({
		mutationFn: (data: RegisterData) =>
			authApi.signUp(data.name, data.email, data.password),
		onSuccess: (response) => {
			console.log(response);
			const { access_token, ...user } = response.data.data;
			setAuth(user);
			localStorage.setItem("user", JSON.stringify(user));
			localStorage.setItem("accessToken", access_token);
			navigate("/");
		},
	});

	const { data, error } = useQuery({
		queryKey: ["profile"],
		queryFn: authApi.getProfile,
		enabled: !!auth,
	});

	useEffect(() => {
		if (error) {
			setAuth(null);
			localStorage.removeItem("user");
			localStorage.removeItem("accessToken");
			navigate("/login");
		}
		if (data) {
			setProfile(data.data.user);
		}
	}, [data, setProfile, error, navigate, setAuth]);

	return {
		profile,
		auth,
		googleLogin: googleLoginMutation.mutate,
		register: registerMutation.mutate,
		isLoading: googleLoginMutation.isPending || registerMutation.isPending,
	};
};
