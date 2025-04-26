import { ArrowRight, BadgeCheck } from "lucide-react";
import { Link } from "react-router";

interface SkillCardProps {
	plan: {
		completed_tasks: number;
		id: number;
		is_finished: number;
		skill_name: string;
		total_tasks: number;
	};
}

const PlanCard = ({ plan }: SkillCardProps) => {
	return (
		<Link
			to={`${plan.id}`}
			className="block w-full  rounded-lg p-3 bg-gradient-to-br from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-md hover:shadow-lg group"
		>
			<div className="h-full flex flex-col justify-between">
				<h2 className="text-sm font-medium text-gray-600 mb-1 line-clamp-2">
					{plan.skill_name}
				</h2>

				<div className="flex items-end gap-2">
					<div className="mt-auto w-full">
						{plan.is_finished ? (
							<div className="flex items-center justify-between">
								<BadgeCheck
									className="text-green-100 translate-y-[40%]"
									size={16}
								/>
							</div>
						) : (
							<div className="flex-1">
								<div className="text-gray-600 text-xs mb-1">
									{plan.completed_tasks}/{plan.total_tasks}
								</div>
								<div className="w-full bg-blue-200 rounded-full h-1.5">
									<div
										className="bg-green-400 h-1.5 rounded-full transition-all duration-500"
										style={{
											width: `${
												(plan.completed_tasks / plan.total_tasks) * 100
											}%`,
										}}
									></div>
								</div>
							</div>
						)}
					</div>
					<ArrowRight
						size={24}
						className="text-white opacity-80 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all translate-y-[40%]"
					/>
				</div>
			</div>
		</Link>
	);
};
export default PlanCard;
