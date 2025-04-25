import { PlanRequest } from "@/types";
import api from "./api";

export const planApi = {
	requestPlan: async (data: PlanRequest) => {
		const res = await api.post("/plans", data);
		return res.data;
	},
	getPlansByUserId: async () => {
		const res = await api.get("/plans");
		return res.data.plans;
	},
	getPlanByPlanId: async (planId: string) => {
		const res = await api.get(`/plans/${planId}`);
		return res.data.plan;
	},
};
