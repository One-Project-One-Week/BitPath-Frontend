import { cn } from "@/lib/utils";
import { ErrorMessage, Field } from "formik";
import { Input } from "../ui/input";

type Props = {
	name: string;
	placeholder: string;
	type?: string;
	customCss?: string;
	customParentCss?: string;
};

const CustomInput = ({
	name,
	placeholder,
	type = "text",
	customCss,
	customParentCss,
}: Props) => {
	return (
		<div className={cn("flex flex-col gap-1 my-4 w-full", customParentCss)}>
			<Field
				className={cn("", customCss)}
				type={type}
				name={name}
				placeholder={placeholder}
				as={Input}
			/>
			<ErrorMessage
				name={name}
				className="text-red-400 text-sm"
				component={"span"}
			/>
		</div>
	);
};

export default CustomInput;
