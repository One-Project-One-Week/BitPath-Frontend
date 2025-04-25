import { Button } from "../ui/button";

interface ErrorDisplayProps {
	error: Error | null;
	resetError?: () => void;
}

const ErrorDisplay = ({ error, resetError }: ErrorDisplayProps) => {
	if (!error) return null;

	return (
		<div className="flex flex-col items-center justify-center p-6 rounded-lg border border-destructive bg-destructive/10 text-destructive">
			<h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
			<p className="text-sm mb-4">{error.message}</p>
			{resetError && (
				<Button variant="destructive" onClick={resetError}>
					Try Again
				</Button>
			)}
		</div>
	);
};

export default ErrorDisplay;
