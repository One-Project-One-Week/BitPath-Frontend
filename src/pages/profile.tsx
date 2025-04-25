import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Flame } from "lucide-react";

const Profile = () => {
	const { profile } = useAuth();
	if (!profile) return null;
	profile.current_streak = "10";

	// Convert streak values to numbers for calculations
	const currentStreak = Number.parseInt(profile.current_streak) || 0;
	const longestStreak = Number.parseInt(profile.longest_streak) || 0;

	// Calculate the heat map gradient based on the current streak
	const getHeatMapGradient = (streak: number) => {
		if (streak === 0) return "from-gray-200 to-gray-300";
		if (streak < 3) return "from-blue-200 via-purple-200 to-red-200";
		if (streak < 7) return "from-blue-300 via-purple-300 to-red-300";
		if (streak < 14) return "from-blue-400 via-purple-400 to-red-400";
		if (streak < 30) return "from-blue-500 via-purple-500 to-red-500";
		return "from-yellow-500 via-orange-500 to-red-600";
	};

	// Get the appropriate gradient class based on streak
	const heatMapGradient = getHeatMapGradient(currentStreak);

	// Format the last studied date
	const formattedLastStudiedDate = profile.last_studied_date
		? new Date(profile.last_studied_date).toLocaleDateString()
		: "Not started yet";

	return (
		<div className="container mx-auto py-10 px-4">
			<Card className="max-w-3xl mx-auto">
				<CardHeader className="pb-0">
					<CardTitle className="text-2xl text-center">Profile</CardTitle>
				</CardHeader>
				<CardContent className="pt-6">
					<div className="flex flex-col md:flex-row items-center gap-8">
						<div className="relative">
							{/* Heat map border */}
							<div
								className={`rounded-full p-1.5 bg-gradient-to-br ${heatMapGradient}`}
							>
								{/* Profile picture */}
								<div className="relative rounded-full overflow-hidden h-32 w-32 border-4 border-white">
									<img
										src={profile.profile_picture || "/placeholder.svg"}
										alt={`${profile.name}'s profile`}
										className="h-full w-full object-cover"
									/>
								</div>
							</div>

							{/* Streak flame icon */}
							{currentStreak > 0 && (
								<div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
									<div className="flex items-center justify-center bg-amber-500 text-white rounded-full p-1.5">
										<Flame size={16} />
										<span className="ml-1 text-xs font-bold">
											{currentStreak}
										</span>
									</div>
								</div>
							)}
						</div>

						<div className="flex-1 space-y-4 text-center md:text-left">
							<h2 className="text-2xl font-bold">{profile.name}</h2>
							<p className="text-gray-500">{profile.email}</p>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
								<div className="bg-gray-50 p-3 rounded-lg">
									<p className="text-sm text-gray-500">Current Streak</p>
									<p className="text-xl font-semibold flex items-center justify-center md:justify-start">
										{currentStreak} day{currentStreak !== 1 ? "s" : ""}
										{currentStreak > 0 && (
											<Flame size={20} className="ml-2 text-amber-500" />
										)}
									</p>
								</div>

								<div className="bg-gray-50 p-3 rounded-lg">
									<p className="text-sm text-gray-500">Longest Streak</p>
									<p className="text-xl font-semibold">
										{longestStreak} day{longestStreak !== 1 ? "s" : ""}
									</p>
								</div>

								<div className="bg-gray-50 p-3 rounded-lg md:col-span-2">
									<p className="text-sm text-gray-500">Last Studied</p>
									<p className="text-lg">{formattedLastStudiedDate}</p>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Profile;
