import api from "./api";

export const leaderboardApi = {
	getLeaderboard: async () => {
		const res = await api.get("/leaderboard");
		await new Promise((resolve) => setTimeout(resolve, 5000));
		return res.data.users;
	},
};
