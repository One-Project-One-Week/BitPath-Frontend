import ErrorDisplay from "@/components/common/ErrorDisplay";
import PageTransition from "@/components/common/PageTransition";
import RoadmapTimeline from "@/components/roadmap/RoadMapTimeline";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { sharedRoadmapApi } from "@/services/sharedRoadmapApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const SharedEachRoadmap = () => {
	const { roadmapId } = useParams();
	const { auth } = useAuth();
	console.log(auth);
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

	const { mutateAsync: joinRoadmap, isPending } = useMutation({
		mutationFn: () => sharedRoadmapApi.joinSharedRoadmap(roadmapId!),
		onSuccess: () => {
			toast.success("You have joined the roadmap");
		},
		onError: (error: AxiosError | Error) => {
			toast.error(
				error instanceof AxiosError
					? (error as AxiosError<{ message: string }>).response?.data
							?.message || "An error occurred"
					: error.message
			);
		},
	});

	const handleJoinRoadmap = async () => {
		if (auth) {
			await joinRoadmap();
		} else {
			toast.error("Please login to join the roadmap");
			navigate("/login", {
				state: {
					from: `/showcase/${roadmapId}`,
					data: roadmap,
				},
			});
		}
	};
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
							disabled={isPending}
							onClick={handleJoinRoadmap}
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
