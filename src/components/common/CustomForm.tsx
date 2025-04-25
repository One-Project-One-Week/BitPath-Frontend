import { cn } from "@/lib/utils";
import { Form, Formik, FormikValues } from "formik";
import { JSX } from "react";
import { Button } from "../ui/button";

interface CustomFormProps<T extends FormikValues> {
	initialValue: T;
	validationSchema?: object;
	onSubmit: (values: T) => void;
	children: React.ReactNode | ((T: T) => JSX.Element);
	customCss?: string;
}
const CustomForm = <T extends FormikValues>({
	initialValue,
	validationSchema,
	onSubmit,
	children,

	customCss,
}: CustomFormProps<T>) => {
	return (
		<Formik
			initialValues={initialValue}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			<Form className={cn("", customCss)}>
				{typeof children === "function" ? children(initialValue) : children}
			</Form>
		</Formik>
	);
};

export default CustomForm;

export const CustomFormSubmitBtn = ({
	label,
	customCss,
	isLoading,
}: {
	label: string;
	customCss?: string;
	isLoading?: boolean;
}) => {
	return (
		<Button type="submit" className={cn("", customCss)} disabled={isLoading}>
			{isLoading ? "..." : label}
		</Button>
	);
};
