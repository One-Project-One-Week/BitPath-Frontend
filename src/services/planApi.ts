import { PlanRequest } from "@/types";
import api from "./api";

export const planApi = {
	requestPlan: async (data: PlanRequest) => {
		const res = await api.post("/plan", data);
		return res.data;
	},
};
