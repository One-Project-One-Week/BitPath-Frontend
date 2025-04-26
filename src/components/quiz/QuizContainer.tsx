import { motion } from "framer-motion";
import { QuizProvider, useQuiz } from "./QuizContext";
import QuizNavigation from "./QuizNavigation";
import QuizQuestion from "./QuizQuestion";
import QuizResults from "./QuizResults";
import QuizStepper from "./QuizStepper";

interface Question {
	id: number;
	quiz_id: number;
	question: string;
	options: string;
	correct_answer: string;
	user_answer: string | null;
	is_correct: number;
	created_at: string;
	updated_at: string;
}

interface QuizContainerProps {
	questions: Question[];
	title: string;
}

function QuizContent() {
	const { isCompleted } = useQuiz();

	return (
		<div className="w-full max-w-3xl mx-auto">
			{!isCompleted ? (
				<div className=" rounded-xl shadow-lg p-8">
					<QuizStepper />
					<QuizQuestion />
					<QuizNavigation />
				</div>
			) : (
				<QuizResults />
			)}
		</div>
	);
}

export default function QuizContainer({
	questions,
	title,
}: QuizContainerProps) {
	return (
		<QuizProvider initialQuestions={questions}>
			<div className="min-h-screen  pt-12 pb-20 px-4">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-8"
				>
					<h1 className="text-3xl font-bold text-gray-600">{title}</h1>
					<p className="text-gray-500 mt-2">
						Test your knowledge for the completed skill
					</p>
				</motion.div>

				<QuizContent />
			</div>
		</QuizProvider>
	);
}
