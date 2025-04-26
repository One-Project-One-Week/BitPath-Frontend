import { cn } from "@/lib/utils";
import { taskApi } from "@/services/taskApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Check, ReceiptText } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface TaskCardProps {
	completed: boolean;
	topic: string;
	dayNumber: number;
	task: string;
	id: number;
	planId: number;
}
const TaskCard = ({
	completed,
	topic,
	dayNumber,
	task,
	id,
	planId,
}: TaskCardProps) => {
	const queryClient = useQueryClient();
	const { mutateAsync } = useMutation({
		mutationFn: async () => {
			await taskApi.markTaskAsCompleted(id);
		},
		// onMutate: () => {
		// 	toast.loading("Marking task as completed...");
		// },
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["plan", String(planId)],
			});
			queryClient.invalidateQueries({
				queryKey: ["quizs", planId],
			});
		},
		onError: (error: AxiosError<{ message: string }>) => {
			toast.error(error?.response?.data?.message ?? "Something went wrong");
		},
	});
	return (
		<div
			className={cn(
				"relative aspect-video border border-gray-200",
				completed
					? "bg-gradient-to-br from-green-100 to-green-200  border-green-200 "
					: "bg-gradient-to-br from-white/15 to-gray-200 hover:from-green-50 hover:to-green-100 transition-all duration-300 shadow-md hover:shadow-lg group"
			)}
		>
			{/* Topic in top left */}
			<div className="flex justify-between p-3 items-start h-2/3 overflow-auto">
				<div className="text-start">
					<h3 className="text-sm  text-gray-700 ">{topic}</h3>
				</div>
				<div>
					<Popover>
						<PopoverTrigger>
							<ReceiptText size={16} />
						</PopoverTrigger>
						<PopoverContent className="w-80">
							<div className="flex flex-col gap-2">
								<h3 className="text-lg font-semibold">{topic}</h3>
								<p className="text-sm text-gray-600">{task}</p>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>

			{/* Day number in bottom left */}
			<div className="absolute bottom-3 left-3">
				<span className=" font-semibold text-gray-800 ">{dayNumber}</span>
			</div>

			<div
				className={cn(
					"absolute bottom-3 right-3 h-4 w-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors",
					completed
						? "bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600"
						: "border-gray-300 dark:border-gray-600"
				)}
				role="checkbox"
				aria-checked={completed}
				tabIndex={0}
				onClick={() => mutateAsync()}
			>
				{completed && <Check className="h-4 w-4 text-white" />}
			</div>
		</div>
	);
};
export default TaskCard;
