import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001/api";

const api = axios.create({
	baseURL: API_URL,
	withCredentials: false, // Changed to false since we don't need credentials for signup
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	}
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		console.log(error.response);
		if (
			error.response.status === 401 &&
			// error.resonse.data.message == "Token has expired" &&
			error.response.data.message !== "unthorized" &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;

			try {
				const response = await api.post("/auth/refresh");
				const { access_token } = response.data.data;

				localStorage.setItem("accessToken", access_token);
				console.log("refreshed token, new token:", response.data);
				api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

				return api(originalRequest);
			} catch (refreshError) {
				localStorage.removeItem("accessToken");
				window.location.href = "/login";
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default api;
