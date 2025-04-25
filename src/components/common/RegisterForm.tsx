import { useAuth } from "@/hooks/useAuth";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import * as Yup from "Yup";
import CustomForm, { CustomFormSubmitBtn } from "./CustomForm";
import CustomInput from "./CustomInput";

interface InitialValue {
    name: string;
    email: string;
    password: string;
}

export default function RegisterForm() {
    const { googleLogin, register, isLoading } = useAuth();

    const initialValue: InitialValue = {
        name: "",
        email: "",
        password: "",
    };

    const onSubmit = async (values: InitialValue) => {
        try {
            console.log('Submitting registration:', values);
            await register(values);
            toast.success("Registration successful!");
        } catch (error: any) {
            console.error('Registration error:', error);
            const errorMessage = error?.response?.data?.message || error?.message || "Registration failed. Please try again.";
            toast.error(errorMessage);
        }
    };

  

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name must be less than 50 characters")
            .required("Name is required"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    return (
        // <section className="flex items-center justify-center h-full">
        <div className="max-w-sm mx-auto p-4  bg-white rounded-lg shadow-lg">
                <div>
                    <h1 className="text-xl font-semibold mb-4 text-center">
                        Sign Up to <span className="italic">BitPath</span>
                    </h1>
                </div>
                
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
                    <GoogleLogin
                        onSuccess={googleLogin}
                        onError={() => {
                            console.error("Google Sign Up Failed");
                            toast.error("Google Sign Up Failed. Please try again.");
                        }}
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
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    <CustomInput
                        customCss="rounded"
                        name="name"
                        placeholder="John Doe"
                        type="text"
                    />
                    <CustomInput
                        customCss="rounded"
                        name="email"
                        placeholder="example@email.com"
                        type="email"
                    />
                    <CustomInput
                        customCss="rounded"
                        name="password"
                        placeholder="••••••••"
                        type="password"
                    />
                    <CustomFormSubmitBtn
                        isLoading={isLoading}
                        label="Sign Up"
                        customCss="rounded w-full"
                    />
                </CustomForm>
            </div>
        </div>
    );
}
