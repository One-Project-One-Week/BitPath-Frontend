import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Award, BarChart, DoorOpen } from "lucide-react";
import { useQuiz } from "./QuizContext";

export default function QuizResults() {
	const { isCompleted, calculateScore, questions, resetQuiz } = useQuiz();

	if (!isCompleted) return null;

	const { correct, total, percentage } = calculateScore();
	const isPerfect = percentage === 100;
	const isGood = percentage >= 70 && percentage < 100;
	const isFair = percentage >= 50 && percentage < 70;

	const getScoreColor = () => {
		if (isPerfect) return "text-green-500";
		if (isGood) return "text-blue-500";
		if (isFair) return "text-yellow-500";
		return "text-red-500";
	};

	const getScoreMessage = () => {
		if (isPerfect) return "Perfect! You're a Linux master!";
		if (isGood)
			return "Great job! You have a solid understanding of Linux commands.";
		if (isFair)
			return "Good effort! Keep practicing to improve your Linux knowledge.";
		return "Keep learning! Review the Linux basics and try again.";
	};

	// const submittedData = getUpdatedQuestionsForSubmission();

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto"
		>
			<div className="text-center mb-8">
				<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
					<Award className="w-10 h-10 text-green-600" />
				</div>
				<h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
				<p className="text-gray-600">
					Here's how you did on the Linux commands quiz
				</p>
			</div>

			<div className="flex justify-center mb-8">
				<div className="relative w-48 h-48">
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="text-center">
							<div className={`text-5xl font-bold ${getScoreColor()}`}>
								{percentage}%
							</div>
							<div className="text-gray-500 mt-1">
								{correct} of {total} correct
							</div>
						</div>
					</div>
					<svg className="w-full h-full" viewBox="0 0 100 100">
						<circle
							cx="50"
							cy="50"
							r="45"
							fill="none"
							stroke="#f3f4f6"
							strokeWidth="10"
						/>
						<motion.circle
							cx="50"
							cy="50"
							r="45"
							fill="none"
							stroke={
								isPerfect
									? "#10b981"
									: isGood
									? "#3b82f6"
									: isFair
									? "#f59e0b"
									: "#ef4444"
							}
							strokeWidth="10"
							strokeDasharray="282.7"
							strokeDashoffset="282.7"
							strokeLinecap="round"
							transform="rotate(-90 50 50)"
							initial={{ strokeDashoffset: 282.7 }}
							animate={{ strokeDashoffset: 282.7 - (percentage / 100) * 282.7 }}
							transition={{ duration: 1.5, ease: "easeOut" }}
						/>
					</svg>
				</div>
			</div>

			<div className="text-center mb-8">
				<p className="text-lg font-medium">{getScoreMessage()}</p>
			</div>

			<div className="space-y-4 mb-8">
				<h3 className="font-semibold flex items-center">
					<BarChart className="w-5 h-5 mr-2 text-green-600" />
					Question Summary
				</h3>
				<div className="space-y-2">
					{questions.map((question) => {
						const isCorrect = question.user_answer === question.correct_answer;
						return (
							<div
								key={question.id}
								className={`p-3 rounded-lg text-sm ${
									isCorrect
										? "bg-green-50 border border-green-100"
										: "bg-red-50 border border-red-100"
								}`}
							>
								<div className="font-medium mb-1">{question.question}</div>
								<div className={isCorrect ? "text-green-600" : "text-red-600"}>
									{isCorrect ? "Correct" : "Incorrect"} - You answered:{" "}
									{question.user_answer
										? question.options[question.user_answer]
										: "No answer"}
								</div>
								{!isCorrect && (
									<div className="text-gray-600 mt-1">
										Correct answer: {question.options[question.correct_answer]}
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>

			<div className="flex flex-col sm:flex-row gap-3 justify-center">
				<Button
					onClick={resetQuiz}
					className="bg-green-600 hover:bg-green-700 text-white"
				>
					Leave
					<DoorOpen className="w-4 h-4 ml-2" />
				</Button>
			</div>
		</motion.div>
	);
}
