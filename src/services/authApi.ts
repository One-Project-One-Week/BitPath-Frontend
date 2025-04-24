import { CredentialResponse } from "@react-oauth/google";
import api from "./api";

export const authApi = {
	login: async (email: string, password: string) => {
		const response = await api.post("/auth/signin", { email, password });
		return response.data;
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
