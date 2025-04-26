import { AxiosError } from "axios";
import { Button } from "../ui/button";

interface ErrorDisplayProps {
	error: Error | null | AxiosError;
	resetError?: () => void;
}

const ErrorDisplay = ({ error, resetError }: ErrorDisplayProps) => {
	if (!error) return null;
	console.log(error);
	return (
		<div className="flex flex-col items-center justify-center p-6 rounded-lg border border-destructive bg-destructive/10 text-destructive">
			<h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
			<p className="text-sm mb-4">
				{error instanceof AxiosError
					? (error as AxiosError<{ message: string }>).response?.data
							?.message || "An error occurred"
					: "An error occurred"}
			</p>
			{resetError && (
				<Button variant="destructive" onClick={resetError}>
					Try Again
				</Button>
			)}
		</div>
	);
};
export default ErrorDisplay;
