import { useAuth } from "@/hooks/useAuth";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import * as Yup from "Yup";
import CustomForm, { CustomFormSubmitBtn } from "./CustomForm";
import CustomInput from "./CustomInput";

interface InitialValue {
	email: string;
	password: string;
}
export default function LoginForm() {
	const { googleLogin, isLoading } = useAuth();
	const initialValue: InitialValue = {
		email: "",
		password: "",
	};
	const onSubmit = (values: InitialValue) => {
		console.log(values);
	};
	const validationSchema = Yup.object({
		email: Yup.string().email("Invalid email").required("Email is required"),
		password: Yup.string()
			.min(6, "Password must be at least 8 characters")
			.required("Password is required"),
	});

	return (
		// <section className="flex items-center justify-center h-full">
		<div className="max-w-sm mx-auto p-4  bg-white rounded-lg shadow-lg">
			<div>
				<h1 className="text-xl font-semibold mb-4 text-center">
					{" "}
					Log In to <span className="italic">BitPath</span>{" "}
				</h1>
			</div>
			<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
				<GoogleLogin
					onSuccess={googleLogin}
					onError={() => console.log("Login Failed")}
				/>
			</GoogleOAuthProvider>
			<div className="mt-4 relative">
				<hr className="relative z-0" />
				<div className="w-full flex items-center justify-center  absolute -top-3 left-0">
					<p className="  bg-white  px-4  text-center text-gray-500 italic">
						or
					</p>
				</div>
			</div>
			<div>
				<CustomForm
					initialValue={initialValue}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					<CustomInput
						customCss="rounded"
						name="email"
						placeholder="example@eg.com"
						type="email"
					/>
					<CustomInput
						customCss="rounded"
						name="password"
						placeholder="password"
						type="password"
					/>
					<CustomFormSubmitBtn
						isLoading={isLoading}
						label="Login"
						customCss="rounded w-full"
					/>
				</CustomForm>
			</div>
		</div>
		// </section>
	);
}
