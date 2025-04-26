import { motion } from "framer-motion";
import { useQuiz } from "./QuizContext";

export default function QuizStepper() {
	const { questions, currentQuestionIndex, userAnswers, goToQuestion } =
		useQuiz();

	return (
		<div className="w-full mb-8">
			<div className="flex justify-between items-center">
				{questions.map((question, index) => {
					const isActive = index === currentQuestionIndex;
					const isAnswered = userAnswers[question.id] !== undefined;

					return (
						<div key={question.id} className="flex flex-col items-center">
							<button
								onClick={() => goToQuestion(index)}
								className={`relative w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300 ${
									isActive
										? "bg-green-600 text-white"
										: isAnswered
										? "bg-green-200 text-green-800"
										: "bg-gray-200 text-gray-600"
								}`}
							>
								{index + 1}
								{isActive && (
									<motion.div
										layoutId="activeStep"
										className="absolute inset-0 bg-green-600 rounded-full -z-10"
										transition={{ type: "spring", stiffness: 300, damping: 30 }}
									/>
								)}
							</button>

							{index < questions.length && (
								<div
									className={`h-0.5 w-16 mt-5 ${
										isAnswered ? "bg-green-300" : "bg-gray-200"
									}`}
								/>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
