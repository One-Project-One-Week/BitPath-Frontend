import * as yup from "Yup";
import CustomForm, { CustomFormSubmitBtn } from "../common/CustomForm";
import CustomInput from "../common/CustomInput";
import { Input } from "../ui/input";
const RoadMapForm = ({
	onSubmit,
	isLoading,
}: {
	onSubmit: ({ prompt }: { prompt: string }) => void;
	isLoading: boolean;
}) => {
	const initialValue = {
		prompt: "",
	};
	const validationSchema = yup.object({
		prompt: yup.string().required("Skills or Role is required"),
	});
	return (
		<div className="mt-20 py-20 rounded shadow">
			<h1 className="text-center font-semibold text-2xl mb-4">
				What Do You Desire To Learn?
			</h1>
			<div className="flex justify-center w-[40vw] mx-auto">
				<CustomForm
					initialValue={initialValue}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
					customCss="w-full  px-4 flex gap-2 items-center justify-center"
				>
					<CustomInput
						name="prompt"
						placeholder="Skills or Role"
						customCss="w-full"
						as={Input}
					/>
					<CustomFormSubmitBtn
						label="Generate"
						isLoading={isLoading}
						customCss=""
					/>
				</CustomForm>
			</div>
		</div>
	);
};

export default RoadMapForm;
