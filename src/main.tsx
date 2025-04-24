import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { AppProvider } from "./AppProvider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			retry: 1,
		},
	},
});
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AppProvider>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<App />
					<Toaster richColors position="top-center" />
				</BrowserRouter>
			</QueryClientProvider>
		</AppProvider>
	</StrictMode>
);
