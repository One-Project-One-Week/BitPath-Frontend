import { createContext, ReactNode, useContext, useState } from "react";

// 1. Define the context type
type AppContextType = {
	auth: Record<string, string> | null;
	setAuth: React.Dispatch<React.SetStateAction<Record<string, string> | null>>;
	profile: Record<string, string | null> | null;
	setProfile: React.Dispatch<
		React.SetStateAction<Record<string, string | null> | null>
	>;
};

// 2. Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// 3. Provider
export const AppProvider = ({ children }: { children: ReactNode }) => {
	const initialUserData = localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user")!)
		: null;
	const [auth, setAuth] = useState<Record<string, string> | null>(
		initialUserData
	);
	const [profile, setProfile] = useState<Record<string, string | null> | null>(
		null
	);

	return (
		<AppContext.Provider value={{ auth, setAuth, profile, setProfile }}>
			{children}
		</AppContext.Provider>
	);
};

// 4. Hook to use context
export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context)
		throw new Error("useYourContext must be used inside YourProvider");
	return context;
};
