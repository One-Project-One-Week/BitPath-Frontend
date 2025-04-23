import { useAppContext } from "@/AppProvider";
import { authApi } from "@/services/authApi";
import { CredentialResponse } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useAuth = () => {
	const navigate = useNavigate();
	const { auth, setAuth } = useAppContext();

	const googleLoginMutation = useMutation({
		mutationFn: (credentialResponse: CredentialResponse) =>
			authApi.googleLogin(credentialResponse),
		onSuccess: (response) => {
			const { token, ...user } = response.data;
			setAuth(user);
			localStorage.setItem("accessToken", token);
			navigate("/");
		},
	});
	return {
		auth,
		googleLogin: googleLoginMutation.mutate,
		isLoading: googleLoginMutation.isPending,
	};
};
