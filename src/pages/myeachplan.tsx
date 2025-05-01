import ErrorDisplay from "@/components/common/ErrorDisplay";
import PageTransition from "@/components/common/PageTransition";
import TaskCard from "@/components/plans/TaskCard";
import { Button } from "@/components/ui/button";
import { planApi } from "@/services/planApi";
import { taskApi } from "@/services/taskApi";
import { Plan } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Lock, MessageCircleQuestion } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const MyEachPlan = () => {
	const { planId } = useParams();
	const navigate = useNavigate();
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["plan", planId],
		queryFn: () => planApi.getPlanByPlanId(planId!),
	});

	const { data: quizs } = useQuery({
		queryKey: ["quizs", planId],
		queryFn: () => taskApi.getTasksQuizs(Number(planId!)),
		enabled: !!data?.is_finished,
	});

	console.log(quizs);

	const plan: Plan = data!;

	return (
		<main className="px-12 py-12">
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
			{isLoading ? (
				<div className="h-[40vh]">
					<PageTransition />
				</div>
			) : (
				<div>
					<div className="flex items-center justify-between gap-4 ">
						<div className="flex items-center gap-4">
							<h1 className="text-xl font-semibold text-green-500 ">
								{plan.skill_name}
							</h1>
							<div className="flex items-center gap-2 h-full">
								<div className=" bg-blue-200 w-20 rounded-full h-1.5">
									<div
										className="bg-green-400 h-1.5 rounded-full transition-all duration-500"
										style={{
											width: `${
												(plan.completed_tasks / plan.total_tasks) * 100
											}%`,
										}}
									></div>
								</div>
								<div className="text-gray-600 text-xs">
									{Math.round((plan.completed_tasks / plan.total_tasks) * 100)}%
								</div>
							</div>
						</div>
						{}
						{plan.is_finished ? (
							<div>
								<div className="flex items-center gap-2">
									<Button
										variant="secondary"
										className="bg-green-500 hover:bg-green-600 text-white"
										onClick={() => {
											const myPromise = new Promise<{ name: string }>(
												(resolve) => {
													setTimeout(() => {
														resolve({ name: "string" });
													}, 3000);
												}
											);

											toast.promise(myPromise, {
												loading: "Quiz Loading..., Patient You Must Be!",
												success: () => {
													navigate("quiz/" + quizs?.id);

													return {
														message: "Quizs loaded",
														description: "Redirecting To Quizy Ground",
													};
												},
												error: "Error",
											});
										}}
									>
										<MessageCircleQuestion />
										Take Quiz
									</Button>
								</div>
							</div>
						) : (
							// ) : quizs?.status === "completed" ? (
							// 	<div>
							// 		<div className="flex items-center gap-2">
							// 			<Button
							// 				variant="secondary"
							// 				className="bg-yellow-500 hover:bg-yellow-600 text-white"
							// 			>
							// 				<Crown />
							// 				Quiz Completed
							// 			</Button>
							// 		</div>
							// 	</div>
							<div className="flex items-center gap-2">
								<Button
									variant="secondary"
									className="bg-green-500 hover:bg-green-600 text-white select-none"
									disabled
								>
									<Lock />
									Take Quiz
								</Button>
							</div>
						)}
					</div>
					<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 py-12">
						{plan?.tasks?.map((day) => (
							<TaskCard
								key={day.id}
								id={day.id}
								planId={plan.id}
								completed={day.is_finished === 0 ? false : true}
								topic={day.topic}
								dayNumber={day.day_number}
								task={day.task}
							/>
						))}
					</div>
				</div>
			)}
		</main>
	);
};

export default MyEachPlan;
