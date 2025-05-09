import { useAppContext } from "@/AppProvider";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { auth } = useAppContext();
	if (!auth) {
		return <Navigate to="/login" replace />;
	}
	return <>{children}</>;
};

export default ProtectedRoute;
