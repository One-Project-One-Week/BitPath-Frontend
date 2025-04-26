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
			console.log("Making signup request to:", `${API_URL}/auth/signup`);
			const response = await api.post(
				"/auth/signup",
				{
					name,
					email,
					password,
				},
				{
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				}
			);
			console.log("Signup response:", response);
			return response.data;
		} catch (error: unknown) {
			console.error("Signup failed:", error);
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
		return response.data.data.user;
	},
	logout: async () => {
		const response = await api.post("/auth/logout");
		return response.data;
	},
};
