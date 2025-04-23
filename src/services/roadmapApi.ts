import api from "./api";

export const roadMapApi = {
	async getRoadMap(prompt: string) {
		const response = await api.post("/roadmap", { prompt });
		return response.data;
	},
};
