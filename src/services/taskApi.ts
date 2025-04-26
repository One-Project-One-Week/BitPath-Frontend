import api from "./api";

export const taskApi = {
	markTaskAsCompleted: async (taskId: number) => {
		const response = await api.put(`/tasks/${taskId}`);
		return response.data;
	},
};
