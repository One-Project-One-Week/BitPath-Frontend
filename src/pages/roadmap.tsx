import ErrorDisplay from "@/components/common/ErrorDisplay";
import LoadingAnimation from "@/components/common/Loading";
import RoadMapForm from "@/components/roadmap/RoadMapForm";
import RoadmapTimeline from "@/components/roadmap/RoadMapTimeline";
import SaveRoadmapForm from "@/components/roadmap/SaveRoadmapForm";
import { Button } from "@/components/ui/button";
import { roadMapApi } from "@/services/roadmapApi";
import { Roadmap as IRoadmap } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router";

const Roadmap = () => {
	const { state: urlState } = useLocation();
	const [roadmap, setRoadmap] = useState<IRoadmap>(
		urlState?.data?.response ? urlState?.data?.response : ({} as IRoadmap)
	);
	const [prompt, setPrompt] = useState(
		urlState?.data?.prompt ? urlState?.data?.prompt : ""
	);
	const [showForm, setShowForm] = useState(
		urlState?.from === "/login" ? false : true
	);
	const {
		mutate: generateRoadmap,
		isPending,
		isSuccess,
		isError,
		error,
	} = useMutation({
		mutationFn: ({ prompt }: { prompt: string }) =>
			roadMapApi.getRoadMap(prompt),
		onSuccess: (data) => {
			setRoadmap(data.response);
			setPrompt(data.prompt);
		},
	});
	const willShowRoadMap = urlState?.from === "/login" ? true : isSuccess;
	return (
		<section className="max-w-5xl mx-auto">
			{isError && (
				<div className="text-center py-20">
					<ErrorDisplay
						error={error}
						resetError={() => {
							window.location.reload();
						}}
					/>
				</div>
			)}
			{showForm && (
				<RoadMapForm
					onSubmit={(value) => {
						setShowForm(false);
						generateRoadmap(value);
					}}
					isLoading={isPending}
				/>
			)}
			{isPending ? (
				<LoadingAnimation />
			) : (
				willShowRoadMap &&
				!showForm && (
					<div className="py-12">
						<div className="flex justify-end gap-2 px-4">
							<SaveRoadmapForm prompt={prompt} response={roadmap} />
							<Button
								onClick={() => setShowForm(true)}
								className="bg-green-500 hover:bg-green-600"
							>
								Generate A New Roadmap
							</Button>
						</div>
						<RoadmapTimeline roadmap={roadmap} />
					</div>
				)
			)}
		</section>
	);
};

export default Roadmap;
