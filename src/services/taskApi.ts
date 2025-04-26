import api from "./api";

export const taskApi = {
	markTaskAsCompleted: async (taskId: number) => {
		const response = await api.put(`/tasks/${taskId}`);
		return response.data;
	},
	getTasksQuizs: async (planId: number) => {
		const response = await api.get("/quiz?plan_id=" + planId);
		return response.data.data;
	},
	updateTaskQuiz: async (quizId: number, score: number) => {
		const response = await api.patch(`/quiz/${quizId}`, {
			score: String(score),
		});
		return response.data;
	},
	getQuizQuestions: async (quiz_id: number) => {
		const response = await api.get("/quizquestions?quiz_id=" + quiz_id);
		return response.data.data;
	},
	submitQuizAnswers: async (question_id: number, answers: string) => {
		const response = await api.patch("/quizquestions/" + question_id, {
			user_answer: answers,
		});
		return response.data;
	},
};
