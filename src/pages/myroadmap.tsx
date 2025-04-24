import CreateNewCard from "@/components/roadmap/CreateNewRoadMap";
import RoadmapCard, { IRoadmapCard } from "@/components/roadmap/RoadMapCard";
import { roadMapApi } from "@/services/roadmapApi";
import { useQuery } from "@tanstack/react-query";

const MyRoadMaps = () => {
	const { data: roadmaps, isLoading } = useQuery({
		queryKey: ["myRoadMaps"],
		queryFn: roadMapApi.getMyRoadMaps,
	});

	return (
		<main className="px-6  py-12">
			<h1 className="text-3xl font-bold mb-8">Saved Roadmaps</h1>
			{!isLoading && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{roadmaps.map((roadmap: IRoadmapCard) => (
						<RoadmapCard key={roadmap.id} roadmap={roadmap} />
					))}
					<CreateNewCard />
				</div>
			)}
		</main>
	);
};

export default MyRoadMaps;
