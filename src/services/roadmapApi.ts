import { Roadmap } from "@/types";
import api from "./api";

export const roadMapApi = {
	async getRoadMap(prompt: string) {
		const response = await api.post("/roadmap", { prompt });
		return response.data;
	},

	async getMyRoadMaps() {
		const response = await api.get("/roadmaps");
		return response.data.roadmap;
	},

	async getRoadMapById(id: string) {
		const response = await api.get(`/roadmap/${id}`);
		return response.data.roadmap;
	},

	async saveRoadMap({
		prompt,
		response,
	}: {
		prompt: string;
		response: Roadmap;
	}) {
		const res = await api.post("/roadmap/store", { prompt, response });
		return res.data;
	},

	async shareRoadmap(id: string, visibility: "public" | "private") {
		const res = await api.patch(`/roadmap/${id}/visibility `, {
			visibility,
		});
		return res.data;
	},

	async deleteRoadmap(id: string) {
		const res = await api.delete(`/roadmap/${id}`);
		return res.data;
	},
};
