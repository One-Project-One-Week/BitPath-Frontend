import { Button } from "@/components/ui/button";
import { taskApi } from "@/services/taskApi";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";
import { useQuiz } from "./QuizContext";

export default function QuizNavigation() {
	const {
		currentQuestionIndex,
		totalQuestions,
		goToPreviousQuestion,
		goToNextQuestion,
		userAnswers,
		questions,
		completeQuiz,
		isCompleted,
		getUpdatedQuestionsForSubmission,
	} = useQuiz();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const { quizId } = useParams();

	const currentQuestion = questions[currentQuestionIndex];
	const isFirstQuestion = currentQuestionIndex === 0;
	const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
	const hasAnsweredCurrent = userAnswers[currentQuestion.id] !== undefined;
	const hasAnsweredAll = questions.every(
		(q) => userAnswers[q.id] !== undefined
	);

	const handleFinishQuiz = async () => {
		if (!hasAnsweredAll || isCompleted) return;

		setIsSubmitting(true);

		try {
			// Get the updated questions with user answers
			const updatedQuestions = getUpdatedQuestionsForSubmission();
			const score = updatedQuestions.filter((q) => q.is_correct === 1).length;
			Promise.all([
				...updatedQuestions.map(async (question) => {
					taskApi.submitQuizAnswers(
						question.id,
						question.user_answer as string
					);
				}),
				taskApi.updateTaskQuiz(Number(quizId), score),
			]);

			// Mark quiz as completed
			completeQuiz();
		} catch (error) {
			console.error("Error submitting quiz:", error);
			// Handle error (show toast, etc.)
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
			<Button
				variant="outline"
				onClick={goToPreviousQuestion}
				disabled={isFirstQuestion || isSubmitting}
				className={isFirstQuestion ? "opacity-50 cursor-not-allowed" : ""}
			>
				<ArrowLeft className="w-4 h-4 mr-2" />
				Previous
			</Button>

			<div className="text-sm text-gray-500">
				Question {currentQuestionIndex + 1} of {totalQuestions}
			</div>

			{isLastQuestion ? (
				<Button
					onClick={handleFinishQuiz}
					disabled={!hasAnsweredAll || isCompleted || isSubmitting}
					className={`bg-green-600 hover:bg-green-700 text-white ${
						!hasAnsweredAll || isCompleted
							? "opacity-50 cursor-not-allowed"
							: ""
					}`}
				>
					{isSubmitting ? (
						<>
							<Loader2 className="w-4 h-4 mr-2 animate-spin" />
							Submitting...
						</>
					) : isCompleted ? (
						<>
							<CheckCircle className="w-4 h-4 mr-2" />
							Completed
						</>
					) : (
						<>
							<CheckCircle className="w-4 h-4 mr-2" />
							Finish Quiz
						</>
					)}
				</Button>
			) : (
				<Button
					onClick={goToNextQuestion}
					disabled={!hasAnsweredCurrent || isSubmitting}
					className={
						!hasAnsweredCurrent
							? "opacity-50 cursor-not-allowed bg-green-200 text-gray-500"
							: "bg-green-300 hover:bg-green-400"
					}
				>
					Next
					<ArrowRight className="w-4 h-4 ml-2" />
				</Button>
			)}
		</div>
	);
}
