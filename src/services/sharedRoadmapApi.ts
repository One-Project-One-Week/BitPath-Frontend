import api from "./api";

export const sharedRoadmapApi = {
	getSharedRoadmap: async () => {
		const response = await api.get("/shared-roadmaps");
		return response.data.roadmap;
	},
	getSharedRoadmapById: async (id: string) => {
		const response = await api.get(`/shared-roadmaps/${id}`);
		return response.data.roadmap;
	},
	joinSharedRoadmap: async (id: string) => {
		const response = await api.post(`/shared-roadmaps/${id}/join`);
		return response.data;
	},
};
