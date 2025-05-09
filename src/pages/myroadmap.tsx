import ErrorDisplay from "@/components/common/ErrorDisplay";
import PageTransition from "@/components/common/PageTransition";
import CreateNewCard from "@/components/roadmap/CreateNewRoadMap";
import RoadmapCard from "@/components/roadmap/RoadMapCard";
import { roadMapApi } from "@/services/roadmapApi";
import { Roadmap } from "@/types";
import { useQuery } from "@tanstack/react-query";

const MyRoadMaps = () => {
	const {
		data: roadmaps,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useQuery({
		queryKey: ["myRoadMaps"],
		queryFn: roadMapApi.getMyRoadMaps,
	});

	return (
		<main className="px-6  py-12">
			<h1 className="text-3xl font-semibold text-gray-600 mb-8">
				Saved Roadmaps
			</h1>
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
				<div className="h-[40vh] flex justify-center items-center">
					<PageTransition />
				</div>
			)}
			{!isLoading && isSuccess && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
					{roadmaps.map((roadmap: Roadmap) => (
						<RoadmapCard key={roadmap.id} roadmap={roadmap} />
					))}
					<CreateNewCard />
				</div>
			)}
		</main>
	);
};

export default MyRoadMaps;
