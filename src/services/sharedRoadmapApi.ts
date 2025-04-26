import api from "./api";

export const sharedRoadmapApi = {
	getSharedRoadmap: async () => {
		const response = await api.get("/shared-roadmaps");
		return response.data.roadmap;
	},
};
