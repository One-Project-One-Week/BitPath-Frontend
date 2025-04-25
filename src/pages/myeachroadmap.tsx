import ErrorDisplay from "@/components/common/ErrorDisplay";
import RoadmapTimeline from "@/components/roadmap/RoadMapTimeline";
import { roadMapApi } from "@/services/roadmapApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const Myeachroadmap = () => {
	const { id } = useParams();
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		queryKey: ["roadmap"],
		queryFn: () => roadMapApi.getRoadMapById(id as string),
	});
	console.log(data);
	return (
		<section className="w-full mx-auto mb-10">
			{isError && (
				<div className="text-center py-20">
					<ErrorDisplay error={error} />
				</div>
			)}
			{!isLoading && isSuccess && (
				<RoadmapTimeline roadmap={{ skills: data.roadmap_skills, ...data }} />
			)}
		</section>
	);
};

export default Myeachroadmap;
