import { createContext, ReactNode, useContext, useState } from "react";

// 1. Define the context type
type AppContextType = {
	auth: Record<string, string> | null;
	setAuth: React.Dispatch<React.SetStateAction<Record<string, string> | null>>;
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

	return (
		<AppContext.Provider value={{ auth, setAuth }}>
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
