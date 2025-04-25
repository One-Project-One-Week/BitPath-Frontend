import LoginForm from "@/components/common/LoginForm";
import { useLocation } from "react-router";

const Login = () => {
	const { state } = useLocation();

	return (
		<div className="w-full py-20 h-screen">
			<LoginForm redirectToRoadmap={state} />
		</div>
	);
};

export default Login;
