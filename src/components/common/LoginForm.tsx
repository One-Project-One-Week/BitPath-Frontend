import { useAuth } from "@/hooks/useAuth";
import { Skill } from "@/types";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Link } from "react-router";
import * as Yup from "yup";
import { Input } from "../ui/input";
import CustomForm, { CustomFormSubmitBtn } from "./CustomForm";
import CustomInput from "./CustomInput";

interface InitialValue {
	email: string;
	password: string;
}

export interface RedirectToRoadmap {
	from?: string;
	data?: {
		prompt?: string;
		response?: {
			title?: string;
			skills?: Skill[];
		};
	};
}
export default function LoginForm({
	redirectToRoadmap,
}: {
	redirectToRoadmap: RedirectToRoadmap;
}) {
	const { googleLogin, login, isLoading } = useAuth(redirectToRoadmap);
	const initialValue: InitialValue = {
		email: "",
		password: "",
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
					useOneTap
					auto_select
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
					onSubmit={login}
					validationSchema={validationSchema}
				>
					<CustomInput
						customCss="rounded"
						name="email"
						placeholder="example@eg.com"
						type="email"
						as={Input}
					/>
					<CustomInput
						customCss="rounded"
						name="password"
						placeholder="password"
						type="password"
						as={Input}
					/>
					<CustomFormSubmitBtn
						isLoading={isLoading}
						label="Login"
						customCss="rounded w-full bg-green-500 hover:bg-green-600 text-white"
					/>
				</CustomForm>
				<div className="mt-4">
					<p className="text-center text-gray-500">
						Don't have an account?{" "}
						<Link to="/signup" className="text-green-500">
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
		// </section>
	);
}
