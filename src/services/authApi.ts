import { CredentialResponse } from "@react-oauth/google";
import api from "./api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const authApi = {
    login: async (email: string, password: string) => {
        const response = await api.post("/auth/signin", { email, password });
        return response.data;
    },

    signUp: async (name: string, email: string, password: string) => {
        try {
            console.log('Making signup request to:', `${API_URL}/auth/signup`);
            const response = await api.post("/auth/signup", {
                name,
                email,
                password,
            }, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            });
            console.log('Signup response:', response);
            return response.data;
        } catch (error: any) {
            console.error('Signup API error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers
            });
            throw error;
        }
    },
    googleLogin: async (credentialResponse: CredentialResponse) => {
        try {
            const response = await api.post("/auth/google/callback", {
                token: credentialResponse.credential,
            });

            return response.data;
        } catch (error) {
            console.error("Authentication failed:", error);
            throw error;
        }
    },
    getProfile: async () => {
        const response = await api.get("/auth/profile");
        return response.data;
    },
};
