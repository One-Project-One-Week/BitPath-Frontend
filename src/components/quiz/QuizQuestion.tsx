import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuiz } from "./QuizContext";

export default function QuizQuestion() {
	const {
		questions,
		currentQuestionIndex,
		userAnswers,
		submitAnswer,
		isCompleted,
	} = useQuiz();
	const currentQuestion = questions[currentQuestionIndex];
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [showFeedback, setShowFeedback] = useState(false);

	// Reset selected option when question changes
	useEffect(() => {
		const savedAnswer = userAnswers[currentQuestion.id];
		setSelectedOption(savedAnswer || null);
		setShowFeedback(savedAnswer !== undefined && isCompleted);
	}, [currentQuestion, userAnswers, isCompleted]);

	const handleOptionSelect = (optionKey: string) => {
		if (isCompleted) return; // Prevent changing answers if quiz is completed

		setSelectedOption(optionKey);
		submitAnswer(currentQuestion.id, optionKey);
	};

	const getOptionClasses = (optionKey: string) => {
		const baseClasses =
			"p-4 border rounded-lg transition-all duration-300 flex items-start gap-3";

		if (isCompleted) {
			if (optionKey === currentQuestion.correct_answer) {
				return `${baseClasses} border-green-500 bg-green-50`;
			} else if (optionKey === selectedOption) {
				return `${baseClasses} border-red-500 bg-red-50`;
			}
			return `${baseClasses} border-gray-200 opacity-70`;
		}

		if (optionKey === selectedOption) {
			return `${baseClasses} border-green-500 bg-green-50`;
		}

		return `${baseClasses} border-gray-200 hover:border-green-300 hover:bg-green-50/50`;
	};

	const getOptionIcon = (optionKey: string) => {
		if (!isCompleted) {
			return (
				<div
					className={`w-6 h-6 rounded-full flex items-center justify-center ${
						optionKey === selectedOption
							? "bg-green-500 text-white"
							: "bg-gray-200 text-gray-600"
					}`}
				>
					{optionKey.toUpperCase()}
				</div>
			);
		}

		if (optionKey === currentQuestion.correct_answer) {
			return <CheckCircle2 className="w-6 h-6 text-green-500" />;
		} else if (optionKey === selectedOption) {
			return <XCircle className="w-6 h-6 text-red-500" />;
		} else {
			return (
				<div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
					{optionKey.toUpperCase()}
				</div>
			);
		}
	};

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={currentQuestion.id}
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: -20 }}
				transition={{ duration: 0.3 }}
				className="w-full"
			>
				<div className="mb-6">
					<h2 className="text-2xl font-bold text-gray-800 mb-2">
						Question {currentQuestionIndex + 1}
					</h2>
					<p className="text-lg text-gray-700">{currentQuestion.question}</p>
				</div>

				<div className="space-y-3">
					{Object.entries(currentQuestion.options).map(([key, value]) => (
						<button
							key={key}
							onClick={() => handleOptionSelect(key)}
							disabled={isCompleted}
							className={`w-full text-left ${getOptionClasses(key)}`}
						>
							{getOptionIcon(key)}
							<span>{value}</span>
						</button>
					))}
				</div>

				{showFeedback && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className={`mt-6 p-4 rounded-lg ${
							selectedOption === currentQuestion.correct_answer
								? "bg-green-100 border border-green-200"
								: "bg-red-100 border border-red-200"
						}`}
					>
						<div className="flex items-start gap-3">
							{selectedOption === currentQuestion.correct_answer ? (
								<CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5" />
							) : (
								<XCircle className="w-6 h-6 text-red-600 mt-0.5" />
							)}
							<div>
								<p className="font-medium">
									{selectedOption === currentQuestion.correct_answer
										? "Correct!"
										: "Incorrect!"}
								</p>
								<p className="text-sm mt-1">
									{selectedOption === currentQuestion.correct_answer
										? "Great job! You selected the right answer."
										: `The correct answer is: ${
												currentQuestion.options[currentQuestion.correct_answer]
										  }`}
								</p>
							</div>
						</div>
					</motion.div>
				)}
			</motion.div>
		</AnimatePresence>
	);
}
