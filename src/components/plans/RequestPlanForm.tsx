import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { planApi } from "@/services/planApi";
import { PlanRequest, PlanType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const RequestPlanForm = () => {
	const queryClient = useQueryClient();
	const { skill_id: skillId } = useParams();
	const [planType, setPlanType] = useState<PlanType>("deadline");
	const [deadline, setDeadline] = useState<number>(0);
	const [duration, setDuration] = useState<string>("");
	const navigate = useNavigate();
	const { mutateAsync, isPending } = useMutation({
		mutationFn: (data: PlanRequest) => planApi.requestPlan(data),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["MyPlans"] });
			toast.success("Plan requested successfully");
			navigate("/profile/plans");
		},
		onError: (error: AxiosError) => {
			toast.error(error.response?.statusText ?? "An error occurred");
		},
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data =
			planType === "deadline"
				? {
						skill_id: parseInt(skillId!),
						type: "deadline" as const,
						days: deadline,
				  }
				: {
						skill_id: parseInt(skillId!),
						type: "tpd" as const,
						duration: duration + "mins",
				  };
		mutateAsync(data);
	};

	return (
		<div className="max-w-md mx-auto bg-background p-4 rounded-lg shadow-md">
			<form className="space-y-4" onSubmit={handleSubmit}>
				<input type="hidden" name="skill_id" value={skillId} />
				<div className="flex flex-col gap-2 my-4 w-full">
					<Label htmlFor="planType">Plan Type</Label>
					<Select onValueChange={(value) => setPlanType(value as PlanType)}>
						<SelectTrigger className="w-full">
							<SelectValue>
								{planType === "deadline" ? "By Deadline" : "By Duration"}
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="deadline">By Deadline</SelectItem>
							<SelectItem value="duration">By Duration</SelectItem>
						</SelectContent>
					</Select>
				</div>
				{planType === "deadline" ? (
					<div className="flex flex-col gap-2 my-4 w-full">
						<Label htmlFor="days">Days</Label>
						<Input
							type="number"
							name="days"
							placeholder="Days"
							className="w-full"
							value={deadline}
							onChange={(e) => {
								const value = e.target.value;
								setDeadline(value === "" ? 0 : Number(value));
							}}
						/>
					</div>
				) : (
					<div className="flex flex-col gap-2 my-4 w-full">
						<Label htmlFor="duration">Duration</Label>
						<Input
							type="number"
							name="duration"
							placeholder="Duration in minutes"
							className="w-full"
							value={duration}
							onChange={(e) => setDuration(e.target.value)}
						/>
					</div>
				)}
				<div className="flex justify-end my-4 w-full">
					<Button type="submit" disabled={isPending}>
						{isPending ? "Generating Study Plan..." : "Request Study Plan"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default RequestPlanForm;
