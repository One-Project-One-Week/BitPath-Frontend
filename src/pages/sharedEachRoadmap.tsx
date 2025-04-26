import ErrorDisplay from "@/components/common/ErrorDisplay";
import PageTransition from "@/components/common/PageTransition";
import RoadmapTimeline from "@/components/roadmap/RoadMapTimeline";
import { Button } from "@/components/ui/button";
import { sharedRoadmapApi } from "@/services/sharedRoadmapApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

const SharedEachRoadmap = () => {
	const { roadmapId } = useParams();
	console.log(roadmapId);
	const navigate = useNavigate();
	const {
		data: roadmap,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useQuery({
		queryKey: ["shared-roadmap"],
		queryFn: () => sharedRoadmapApi.getSharedRoadmapById(roadmapId!),
	});

	console.log(roadmap);
	return (
		<div className="py-12 max-w-5xl mx-auto">
			{isLoading && (
				<div className="py-20">
					<PageTransition />
				</div>
			)}
			{isError && (
				<div className="py-20 text-center px-12">
					<ErrorDisplay error={error} />
				</div>
			)}
			{isSuccess && (
				<div>
					<div className="flex justify-end gap-2 px-4">
						<Button
							variant="outline"
							className="text-green-500 hover:text-green-600/80"
						>
							Save To Follow The Path
						</Button>
						<Button
							onClick={() => navigate("/roadmap")}
							className="bg-green-500 hover:bg-green-600 text-white px-4 py-2"
						>
							Create Your Own Roadmap
						</Button>
					</div>
					<RoadmapTimeline roadmap={roadmap} />
				</div>
			)}
		</div>
	);
};

export default SharedEachRoadmap;
