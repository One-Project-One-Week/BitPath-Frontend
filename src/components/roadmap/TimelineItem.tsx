import { Skill } from "@/types";
import { motion, useAnimation, useInView } from "framer-motion";
import { ChevronsRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { getDurationInDays } from "./RoadMapTimeline";

const getLevelColor = (level: string) => {
	if (level.includes("Beginner") && level.includes("Intermediate")) {
		return "bg-gradient-to-r from-green-300 to-yellow-200";
	} else if (level.includes("Intermediate") && level.includes("Advanced")) {
		return "bg-gradient-to-r from-yellow-200 to-red-400";
	} else if (level.includes("Beginner")) {
		return "bg-green-300";
	} else if (level.includes("Intermediate")) {
		return "bg-yellow-200";
	} else if (level.includes("Advanced")) {
		return "bg-red-400";
	}
	return "bg-gray-300";
};

const TimelineItem = ({ skill, index }: { skill: Skill; index: number }) => {
	const { id } = useParams();
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const controls = useAnimation();
	const navigate = useNavigate();
	const isEven = index % 2 === 0;

	useEffect(() => {
		if (isInView) {
			controls.start("visible");
		}
	}, [isInView, controls]);

	const variants = {
		hidden: { opacity: 0, x: isEven ? -50 : 50 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.5,
				delay: index * 0.1,
				ease: "easeOut",
			},
		},
	};

	const durationInDays = getDurationInDays(skill.duration);
	const durationScale = Math.log(durationInDays) / Math.log(90); // Logarithmic scale for better visualization
	const cardHeight = `${Math.max(280, 280 + durationScale * 40)}px`;

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={controls}
			variants={variants}
			className={`relative group ${
				isEven ? "md:ml-auto" : "md:mr-auto"
			} md:w-[calc(50%-20px)]`}
		>
			<div
				className={`absolute top-0 bottom-0 w-1 rounded-full  ${getLevelColor(
					skill.level
				)} hidden md:block`}
				style={{
					left: isEven ? "-20px" : "auto",
					right: isEven ? "auto" : "-20px",
					marginLeft: isEven ? "-2px" : "0",
					marginRight: isEven ? "0" : "-2px",
					height: cardHeight,
				}}
			/>

			<Card
				className={`p-6 border-l-4 ${getLevelColor(
					skill.level
				)} shadow-lg hover:shadow-xl transition-shadow duration-300`}
				style={{ minHeight: cardHeight }}
			>
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-xl font-bold">{skill.skill}</h3>
					{id && (
						<Button
							onClick={() =>
								navigate("/profile/plans/request/" + skill.id, {
									state: { skill: skill.skill },
								})
							}
							variant="link"
							className="group-hover:visible invisible"
						>
							Create Study Plan
							<ChevronsRight />
						</Button>
					)}
				</div>

				<div className="mb-3 flex items-center">
					<Badge variant="outline" className="mr-2 font-semibold">
						{skill.duration}
					</Badge>
					<Badge className={`${getLevelColor(skill.level)} text-white`}>
						{skill.level}
					</Badge>
				</div>

				<p className="mb-4 text-gray-700">{skill.why}</p>

				<div className="mt-auto">
					<h4 className="font-semibold mb-1">Recommended Resources:</h4>
					{skill.recommendedResource.map((resource, index) => (
						<a
							key={index}
							href={resource.link}
							className="block mb-2 text-emerald-600 hover:text-emerald-800 hover:underline transition-colors"
							target="_blank"
							rel="noopener noreferrer"
						>
							{resource.name}
						</a>
					))}
				</div>
			</Card>
		</motion.div>
	);
};

export default TimelineItem;
