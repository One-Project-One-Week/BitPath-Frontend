import { Roadmap } from "@/types";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const RoadmapCard = ({
	roadmap,
	index = 0,
}: {
	roadmap: Roadmap;
	index?: number;
}) => {
	return (
		<motion.div
			key={index}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			className="relative group bg-gradient-to-br from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 rounded-xl "
		>
			<Link
				to={String(roadmap.id!)}
				className="rounded-xl overflow-hidden h-full transition-all duration-300 transform group-hover:scale-[1.02] group-hover:shadow-xl"
			>
				{/* Card content */}
				<div className="p-6 h-full flex flex-col justify-between">
					<h3 className="text-xl font-bold text-white mb-3">{roadmap.title}</h3>

					<div className="flex-grow">
						<div className="flex flex-wrap gap-2 mb-3">
							{roadmap.skills.slice(0, 3).map((skill, skillIndex) => (
								<span
									key={skillIndex}
									className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full"
								>
									{skill as string}
								</span>
							))}
							<span className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full">
								and more...
							</span>
						</div>
					</div>

					<div className="mt-4 flex justify-between items-center text-white/80 text-sm">
						<div className="flex items-center">
							<svg
								className="w-4 h-4 mr-1"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							{Math.round(Number(roadmap.estimatedTime?.split(" ")[0])) +
								" " +
								roadmap.estimatedTime?.split(" ")[1]}
						</div>
						<div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-1">
							<ArrowRight className="h-4 w-4" />
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export default RoadmapCard;
