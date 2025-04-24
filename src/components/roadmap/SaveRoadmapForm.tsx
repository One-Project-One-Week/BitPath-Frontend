import { roadMapApi } from "@/services/roadmapApi";
import { Roadmap } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import CustomForm from "../common/CustomForm";
import CustomInput from "../common/CustomInput";
import { Button } from "../ui/button";

const SaveRoadmapForm = ({
	prompt,
	response,
}: {
	prompt: string;
	response: Roadmap;
}) => {
	const initialValue = {
		prompt,
		response,
	};
	const { mutateAsync, isPending, isSuccess } = useMutation({
		mutationFn: (value: typeof initialValue) =>
			roadMapApi.saveRoadMap({
				prompt: value.prompt,
				response: value.response,
			}),
		onSuccess: () => {
			toast.success("Roadmap saved successfully", {
				description: "Go to your roadmaps to create study plans",
			});
		},
	});
	return (
		<CustomForm initialValue={initialValue} onSubmit={mutateAsync}>
			<CustomInput
				name="prompt"
				placeholder="Prompt"
				type="hidden"
				customParentCss="hidden"
			/>
			<CustomInput
				name="response"
				placeholder="response"
				type="hidden"
				customParentCss="hidden"
			/>
			<Button type="submit" variant="outline" disabled={isPending || isSuccess}>
				{isPending ? "Saving ..." : "Save To My Roadmaps"}
			</Button>
		</CustomForm>
	);
};

export default SaveRoadmapForm;
