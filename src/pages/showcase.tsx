import ErrorDisplay from "@/components/common/ErrorDisplay";
import PageTransition from "@/components/common/PageTransition";
import RoadmapCard from "@/components/roadmap/RoadMapCard";
import { Button } from "@/components/ui/button";
import { sharedRoadmapApi } from "@/services/sharedRoadmapApi";
import { Roadmap } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const ShowCase = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["shared-roadmaps"],
		queryFn: sharedRoadmapApi.getSharedRoadmap,
	});
	console.log(data);
	return (
		<section className="max-w-6xl mx-auto py-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="max-w-4xl mx-auto text-center mb-12"
			>
				<h1 className="text-xl md:text-3xl font-bold text-gray-600 mb-4">
					Roadmaps Generated Using Our Platform
				</h1>
				<p className="text-xl text-gray-500 mb-8">
					Explore curated learning paths created by our AI to help you master
					new skills efficiently
				</p>
				<Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md">
					Generate Your Own Path
					<Zap className="ml-1 h-5 w-5" />
				</Button>
			</motion.div>

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
				<div className="text-center py-20">
					<PageTransition />
				</div>
			)}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
				{data?.map((roadmap: Roadmap, id: number) => (
					<RoadmapCard key={roadmap.id} roadmap={roadmap} index={id} />
				))}
			</div>
		</section>
	);
};

export default ShowCase;
