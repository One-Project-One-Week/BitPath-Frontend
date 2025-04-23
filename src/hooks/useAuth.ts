import { useAppContext } from "@/AppProvider";
import { authApi } from "@/services/authApi";
import { CredentialResponse } from "@react-oauth/google";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useAuth = () => {
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
			navigate("/");
		},
	});
	const { data } = useQuery({
		queryKey: ["profile"],
		queryFn: authApi.getProfile,
		enabled: !!auth,
	});
	useEffect(() => {
		if (data) {
			setProfile(data.data.user);
		}
	}, [data, setProfile]);
	return {
		profile,
		auth,
		googleLogin: googleLoginMutation.mutate,
		isLoading: googleLoginMutation.isPending,
	};
};
