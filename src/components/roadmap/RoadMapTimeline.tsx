import { Roadmap } from "@/types";
import TimelineItem from "./TimelineItem";

export const getDurationInDays = (duration: string): number => {
	if (duration.includes("week")) {
		const weeks = Number.parseInt(duration.split(" ")[0]);
		return weeks * 7;
	} else if (duration.includes("month")) {
		const months = Number.parseInt(duration.split(" ")[0]);
		return months * 30;
	} else if (duration.includes("-")) {
		// Handle ranges like "2-3 months"
		const range = duration.split(" ")[0];
		const max = Number.parseInt(range.split("-")[1]);
		return max * 30;
	}
	return 7; // Default to a week
};

export default function RoadmapTimeline({ roadmap }: { roadmap: Roadmap }) {
	const totalDuration = roadmap.skills.reduce((total, skill) => {
		return total + getDurationInDays(skill.duration);
	}, 0);

	const totalMonths = Math.round(totalDuration / 30);

	return (
		<div className="py-10 px-4">
			<div className="max-w-5xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold mb-2">{roadmap.title} Roadmap</h2>
					<p className="text-gray-600">
						Estimated completion time:{" "}
						<span className="font-semibold">{totalMonths} months</span>
					</p>
				</div>

				<div className="relative">
					{/* Timeline center line (visible only on md and up) */}
					<div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-300 via-emerald-500 to-emerald-700 transform -translate-x-1/2" />

					{/* Timeline items in a staggered zigzag pattern */}
					<div className="flex flex-col md:block relative">
						{roadmap.skills.map((skill, index) => {
							const marginTop = index === 0 ? "mt-0" : "mt-16";

							return (
								<div key={index} className={`${marginTop} relative`}>
									<TimelineItem skill={skill} index={index} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
