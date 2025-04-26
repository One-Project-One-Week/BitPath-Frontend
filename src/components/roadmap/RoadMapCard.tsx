import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export interface IRoadmapCard {
	id: number;
	title: string;
}
const RoadmapCard = ({
	roadmap,
	index = 0,
	color = "bg-gradient-to-br from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500",
}: {
	roadmap: IRoadmapCard;
	index?: number;
	color?: string;
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 * index }}
		>
			<Link
				to={`${roadmap.id}`}
				className={`block h-48 rounded-lg p-6  transition-all duration-300 shadow-md hover:shadow-lg group ${color}`}
			>
				<div className="h-full flex flex-col justify-between bg-">
					<h2 className="text-xl font-semibold text-white">{roadmap.title}</h2>
					<div className="flex justify-end">
						<ArrowRight className="text-white opacity-70 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export default RoadmapCard;
