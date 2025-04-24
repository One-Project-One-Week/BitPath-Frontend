import RoadmapTimeline from "@/components/roadmap/RoadMapTimeline";
import { roadMapApi } from "@/services/roadmapApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const Myeachroadmap = () => {
	const { id } = useParams();
	const { data, isLoading } = useQuery({
		queryKey: ["roadmap"],
		queryFn: () => roadMapApi.getRoadMapById(id as string),
	});
	console.log(data);
	return (
		<section className="w-full mx-auto text-center">
			{!isLoading && (
				<RoadmapTimeline roadmap={{ skills: data.roadmap_skills, ...data }} />
			)}
		</section>
	);
};

export default Myeachroadmap;
