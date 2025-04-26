import { useAuth } from "@/hooks/useAuth";
import { roadMapApi } from "@/services/roadmapApi";
import { Roadmap } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import CustomForm from "../common/CustomForm";
import CustomInput from "../common/CustomInput";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SaveRoadmapForm = ({
	prompt,
	response,
}: {
	prompt: string;
	response: Roadmap;
}) => {
	const queryClient = useQueryClient();
	const initialValue = {
		prompt,
		response,
	};
	const { auth } = useAuth();
	const navigate = useNavigate();
	const { mutateAsync, isPending, isSuccess } = useMutation({
		mutationFn: (value: typeof initialValue) =>
			roadMapApi.saveRoadMap({
				prompt: value.prompt,
				response: value.response,
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["myRoadMaps"] });
			toast.success("Roadmap saved successfully", {
				description: "Go to your roadmaps to create study plans",
			});
		},
	});
	return (
		<CustomForm
			initialValue={initialValue}
			onSubmit={(value) => {
				console.log(auth);
				if (!auth) {
					toast.error("You must be logged in to save roadmaps");
					navigate("/login", {
						state: { from: "/roadmap", data: initialValue },
					});
				}
				mutateAsync(value);
			}}
		>
			<CustomInput
				as={Input}
				name="prompt"
				placeholder="Prompt"
				type="hidden"
				customParentCss="hidden"
			/>
			<CustomInput
				as={Input}
				name="response"
				placeholder="response"
				type="hidden"
				customParentCss="hidden"
			/>
			<Button
				type="submit"
				className="text-green-500 hover:text-green-500/80"
				variant="outline"
				disabled={isPending || isSuccess}
			>
				{isPending ? "Saving ..." : "Save To My Roadmaps"}
			</Button>
		</CustomForm>
	);
};

export default SaveRoadmapForm;
