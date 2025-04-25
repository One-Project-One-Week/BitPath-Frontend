import ErrorDisplay from "@/components/common/ErrorDisplay";
import RoadmapTimeline from "@/components/roadmap/RoadMapTimeline";
import { Button } from "@/components/ui/button";
import { roadMapApi } from "@/services/roadmapApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Lock, Share2 } from "lucide-react";
import { useParams } from "react-router";
import { toast } from "sonner";

const Myeachroadmap = () => {
	const { id } = useParams();
	const queryClient = useQueryClient();
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		queryKey: ["myRoadMap", id],
		queryFn: () => roadMapApi.getRoadMapById(id as string),
	});

	const { mutateAsync, isPending: isSharing } = useMutation({
		mutationFn: ({
			id,
			visibility,
		}: {
			id: string;
			visibility: "public" | "private";
		}) => roadMapApi.shareRoadmap(id, visibility),
		onSuccess: () => {
			toast.success("Roadmap's Visibility Updated!");
			queryClient.invalidateQueries({ queryKey: ["myRoadMap", id] });
		},
		onError: () => {
			toast.error("Error sharing roadmap");
		},
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
				<>
					<div className="relative  max-w-5xl mx-auto px-4">
						<div className="relative group md:ml-auto md:w-[calc(50%-20px)]">
							<Button
								className="absolute right-0 top-12 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition-colors duration-300 flex items-center gap-2"
								onClick={() =>
									mutateAsync({
										id: id!,
										visibility:
											data.visibility === "public" ? "private" : "public",
									})
								}
								disabled={isSharing}
							>
								Make {data.visibility === "public" ? "Private" : "Public"}
								{data.visibility === "private" ? <Share2 /> : <Lock />}
							</Button>
						</div>
					</div>

					<RoadmapTimeline roadmap={{ skills: data.roadmap_skills, ...data }} />
				</>
			)}
		</section>
	);
};
export default Myeachroadmap;
