import LoadingAnimation from "@/components/common/Loading";
import RoadMapForm from "@/components/roadmap/RoadMapForm";
import RoadmapTimeline from "@/components/roadmap/RoadMapTimeline";
import { Button } from "@/components/ui/button";
import { roadMapApi } from "@/services/roadmapApi";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const Roadmap = () => {
	const [roadmap, setRoadmap] = useState([]);
	const [showForm, setShowForm] = useState(true);
	const {
		mutate: generateRoadmap,
		isPending,
		isSuccess,
	} = useMutation({
		mutationFn: ({ prompt }: { prompt: string }) =>
			roadMapApi.getRoadMap(prompt),
		onSuccess: (data) => {
			setRoadmap(data.response);
		},
	});
	return (
		<section className="max-w-5xl mx-auto">
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
				isSuccess &&
				!showForm && (
					<div>
						<Button onClick={() => setShowForm(true)}>
							Generate A New Roadmap
						</Button>
						<RoadmapTimeline roadmap={roadmap} />
					</div>
				)
			)}
		</section>
	);
};

export default Roadmap;
