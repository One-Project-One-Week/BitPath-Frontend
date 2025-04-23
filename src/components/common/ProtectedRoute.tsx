import { useAppContext } from "@/AppProvider";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { auth } = useAppContext();
	console.log(auth);
	if (!auth) {
		return <Navigate to="/login" replace />;
	}
	return <>{children}</>;
};

export default ProtectedRoute;
