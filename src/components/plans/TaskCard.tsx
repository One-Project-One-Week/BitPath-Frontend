import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface TaskCardProps {
	completed: boolean;
	topic: string;
	dayNumber: number;
	task: string;
	onToggleCompletion: (dayNumber: number) => void;
}
const TaskCard = ({
	completed,
	topic,
	dayNumber,
	task,
	onToggleCompletion,
}: TaskCardProps) => {
	return (
		<Popover>
			<PopoverTrigger>
				<div
					className={cn(
						"relative aspect-video border border-gray-200",
						completed
							? "bg-green-50 dark:bg-green-900/20 border-green-200 "
							: "bg-white "
					)}
				>
					{/* Topic in top left */}
					<div className="p-3 text-start">
						<h3 className="text-sm  text-gray-700 ">{topic}</h3>
					</div>

					{/* Day number in bottom left */}
					<div className="absolute bottom-3 left-3">
						<span className=" font-semibold text-gray-800 ">{dayNumber}</span>
					</div>

					{/* Checkbox in bottom right */}
					<div
						className={cn(
							"absolute bottom-3 right-3 h-6 w-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors",
							completed
								? "bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600"
								: "border-gray-300 dark:border-gray-600"
						)}
						onClick={() => onToggleCompletion(dayNumber)}
						role="checkbox"
						aria-checked={completed}
						tabIndex={0}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								onToggleCompletion(dayNumber);
								e.preventDefault();
							}
						}}
					>
						{completed && <Check className="h-4 w-4 text-white" />}
					</div>
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="flex flex-col gap-2">
					<h3 className="text-lg font-semibold">{topic}</h3>
					<p className="text-sm text-gray-600">{task}</p>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default TaskCard;
