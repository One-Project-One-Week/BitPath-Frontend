import ErrorDisplay from "@/components/common/ErrorDisplay";
import RoadmapTimeline from "@/components/roadmap/RoadMapTimeline";
import { Button } from "@/components/ui/button";
import { roadMapApi } from "@/services/roadmapApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Lock, Share2, Unplug } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const Myeachroadmap = () => {
	const { id } = useParams();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
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

	const { mutateAsync: deleteRoadmap, isPending: isDeleting } = useMutation({
		mutationFn: (id: string) => roadMapApi.deleteRoadmap(id),
		onSuccess: () => {
			toast.success("Abondoned Roadmap Successfully");
			queryClient.invalidateQueries({ queryKey: ["myRoadMaps", "MyPlans"] });
			navigate("/profile/roadmaps");
		},
		onError: () => {
			toast.error("Error deleting roadmap");
		},
	});


	return (
		<section className="w-full mx-auto mb-10">
			{isError && (
				<div className="text-center py-20">
					<ErrorDisplay error={error} />
				</div>
			)}
			{!isLoading && isSuccess && (
				<>
					<div className="relative  max-w-5xl mx-auto px-4 bg-amber-500">
						<Button
							className="absolute left-0 top-12 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition-colors duration-300 flex items-center gap-2"
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
						<Button className="absolute right-0 top-12 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors duration-300 flex items-center gap-2" onClick={() => deleteRoadmap(id!)} disabled={isDeleting}>
							Abondon
							<Unplug />
						</Button>
					</div>

					<RoadmapTimeline roadmap={{ skills: data.roadmap_skills, ...data }} />
				</>
			)}
		</section>
	);
};
export default Myeachroadmap;
