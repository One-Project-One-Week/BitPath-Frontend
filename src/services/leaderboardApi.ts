import api from "./api";

export const leaderboardApi = {
	getLeaderboard: async () => {
		const res = await api.get("/leaderboard");
		return res.data.users;
	},
};
