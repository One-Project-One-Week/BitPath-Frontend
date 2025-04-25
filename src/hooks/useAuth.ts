import { useAppContext } from "@/AppProvider";
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

interface AuthResponse {
    data: {
        token: string;
        [key: string]: any;
    };
}

export const useAuth = () => {
    const navigate = useNavigate();
    const { auth, setAuth, profile, setProfile } = useAppContext();

    const googleLoginMutation = useMutation({
        mutationFn: (credentialResponse: CredentialResponse) =>
            authApi.googleLogin(credentialResponse),
        onSuccess: response => {
            const { token, ...user } = response.data;
            setAuth(user);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("accessToken", token);
            navigate("/");
        },
    });

    const registerMutation = useMutation({
        mutationFn: (data: RegisterData) => 
            authApi.signUp(data.name, data.email, data.password),
        onSuccess: (response: AuthResponse) => {
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
        register: registerMutation.mutate,
        isLoading: googleLoginMutation.isPending || registerMutation.isPending,
    };
};
