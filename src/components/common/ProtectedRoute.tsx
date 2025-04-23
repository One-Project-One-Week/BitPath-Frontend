import { useAppContext } from "@/AppProvider";
import { redirect } from "react-router";
import LoginForm from "./LoginForm";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { auth } = useAppContext();
    if (!auth) return <LoginForm />;
    return <>{children}</>;
};

export default ProtectedRoute;
