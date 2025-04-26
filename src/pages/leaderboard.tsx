import ErrorDisplay from "@/components/common/ErrorDisplay";
import PageTransition from "@/components/common/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { leaderboardApi } from "@/services/leaderboardApi";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Flame, Medal, Trophy } from "lucide-react";

const Leaderboard = () => {
	const { data, isLoading, isError, error, isSuccess } = useQuery({
		queryKey: ["leaderboard"],
		queryFn: leaderboardApi.getLeaderboard,
	});
	return (
		<section className="max-w-5xl mx-auto">
			<div className="container mx-auto py-10 px-4">
				<Card className="max-w-4xl mx-auto">
					<CardHeader className="pb-2">
						<CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
							<Trophy className="text-yellow-500" size={24} />
							Streak Leaderboard
							<Flame className="text-red-500" size={24} />
						</CardTitle>
					</CardHeader>
					{isError && (
						<div className="text-center py-20 px-20">
							<ErrorDisplay
								error={error}
								resetError={() => {
									window.location.reload();
								}}
							/>
						</div>
					)}
					{isLoading && (
						<div className="text-center py-20">
							<PageTransition />
						</div>
					)}
					{isSuccess && (
						<CardContent>
							<div className="overflow-hidden rounded-lg border border-gray-200">
								{/* Header */}
								<div className="bg-gray-100 px-4 py-3 grid grid-cols-12 text-sm font-medium text-gray-700">
									<div className="col-span-1 text-center">#</div>
									<div className="col-span-7 sm:col-span-5">User</div>
									<div className="col-span-4 sm:col-span-3 text-center">
										Longest Streak
									</div>
									<div className="hidden sm:block sm:col-span-3 text-center">
										Current Streak
									</div>
								</div>

								{/* Leaderboard rows */}
								<div className="divide-y divide-gray-200">
									{data.map((user: User, index: number) => (
										<div
											key={user.id}
											className={`px-4 py-3 grid grid-cols-12 items-center ${getRowStyle(
												index
											)}`}
										>
											{/* Rank */}
											<div className="col-span-1 text-center font-bold">
												{index + 1}
											</div>

											{/* User info */}
											<div className="col-span-7 sm:col-span-5 flex items-center gap-3">
												<div className="relative">
													{/* Profile picture with heat map border */}
													<div
														className={`rounded-full p-0.5 bg-gradient-to-br ${getHeatMapGradient(
															user.current_streak
														)}`}
													>
														<div className="rounded-full overflow-hidden h-10 w-10 border border-white">
															<img
																src={user.profile_picture || "/placeholder.svg"}
																alt={`${user.name}'s profile`}
																className="h-full w-full object-cover"
															/>
														</div>
													</div>
													{/* Rank badge for top 3 */}
													{getRankBadge(index)}
												</div>
												<span className="font-medium truncate">
													{user.name}
												</span>
											</div>

											{/* Longest streak */}
											<div className="col-span-4 sm:col-span-3 text-center">
												<div className="flex items-center justify-center gap-1">
													<span className="font-bold">
														{user.longest_streak}
													</span>
													<Flame
														size={16}
														className={`${
															user.longest_streak > 0
																? "text-red-500"
																: "text-gray-400"
														}`}
													/>
												</div>
											</div>

											{/* Current streak - hidden on mobile */}
											<div className="hidden sm:block sm:col-span-3 text-center">
												<div className="flex items-center justify-center gap-1">
													<span className="font-medium">
														{user.current_streak}
													</span>
													<Flame
														size={16}
														className={`${
															user.current_streak > 0
																? "text-amber-500"
																: "text-gray-400"
														}`}
													/>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Legend */}
							<div className="mt-6 text-sm text-gray-500 flex flex-col sm:flex-row gap-4 justify-center items-center">
								<div className="flex items-center gap-2">
									<Trophy size={16} className="text-yellow-500" />
									<span>1st Place</span>
								</div>
								<div className="flex items-center gap-2">
									<Medal size={16} className="text-gray-400" />
									<span>2nd Place</span>
								</div>
								<div className="flex items-center gap-2">
									<Medal size={16} className="text-amber-700" />
									<span>3rd Place</span>
								</div>
								<div className="flex items-center gap-2">
									<Flame size={16} className="text-red-500" />
									<span>Longest Streak</span>
								</div>
							</div>
						</CardContent>
					)}
				</Card>
			</div>
		</section>
	);
};

// Get the heat map gradient based on the streak
const getHeatMapGradient = (streak: number) => {
	if (streak === 0) return "from-gray-200 to-gray-300";
	if (streak < 3) return "from-blue-200 via-purple-200 to-red-200";
	if (streak < 7) return "from-blue-300 via-purple-300 to-red-300";
	if (streak < 14) return "from-blue-400 via-purple-400 to-red-400";
	if (streak < 30) return "from-blue-500 via-purple-500 to-red-500";
	return "from-yellow-500 via-orange-500 to-red-600";
};

// Get rank badge based on position
const getRankBadge = (position: number) => {
	switch (position) {
		case 0: // 1st place
			return (
				<div className="absolute -top-1 -left-1 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full p-1.5 shadow-lg">
					<Trophy size={16} className="text-white" />
				</div>
			);
		case 1: // 2nd place
			return (
				<div className="absolute -top-1 -left-1 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full p-1.5 shadow-lg">
					<Medal size={16} className="text-white" />
				</div>
			);
		case 2: // 3rd place
			return (
				<div className="absolute -top-1 -left-1 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full p-1.5 shadow-lg">
					<Medal size={16} className="text-white" />
				</div>
			);
		default:
			return null;
	}
};

// Get background style for leaderboard row based on position
const getRowStyle = (position: number) => {
	switch (position) {
		case 0: // 1st place
			return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400";
		case 1: // 2nd place
			return "bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-400";
		case 2: // 3rd place
			return "bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-600";
		default:
			return "bg-white hover:bg-gray-50";
	}
};

export default Leaderboard;
