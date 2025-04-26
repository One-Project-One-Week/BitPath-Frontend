import type React from "react";
import { createContext, useContext, useState } from "react";

interface QuizQuestion {
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

interface ParsedQuestion extends Omit<QuizQuestion, "options"> {
	options: Record<string, string>;
}

interface QuizContextType {
	questions: ParsedQuestion[];
	currentQuestionIndex: number;
	userAnswers: Record<number, string>;
	isCompleted: boolean;
	totalQuestions: number;
	goToQuestion: (index: number) => void;
	goToNextQuestion: () => void;
	goToPreviousQuestion: () => void;
	submitAnswer: (questionId: number, answer: string) => void;
	completeQuiz: () => void;
	resetQuiz: () => void;
	calculateScore: () => { correct: number; total: number; percentage: number };
	getUpdatedQuestionsForSubmission: () => QuizQuestion[];
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function useQuiz() {
	const context = useContext(QuizContext);
	if (!context) {
		throw new Error("useQuiz must be used within a QuizProvider");
	}
	return context;
}

interface QuizProviderProps {
	children: React.ReactNode;
	initialQuestions: QuizQuestion[];
}

export function QuizProvider({
	children,
	initialQuestions,
}: QuizProviderProps) {
	// Store the original questions for later submission
	const [originalQuestions] = useState<QuizQuestion[]>(initialQuestions);

	// Parse the options JSON string for each question
	const parsedQuestions: ParsedQuestion[] = initialQuestions.map((q) => ({
		...q,
		options: JSON.parse(q.options),
	}));

	const [questions, setQuestions] = useState<ParsedQuestion[]>(parsedQuestions);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
	const [isCompleted, setIsCompleted] = useState(false);

	const totalQuestions = questions.length;

	const goToQuestion = (index: number) => {
		if (index >= 0 && index < totalQuestions) {
			setCurrentQuestionIndex(index);
		}
	};

	const goToNextQuestion = () => {
		if (currentQuestionIndex < totalQuestions - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	const goToPreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	const submitAnswer = (questionId: number, answer: string) => {
		setUserAnswers((prev) => ({
			...prev,
			[questionId]: answer,
		}));

		// Update the questions array with the user's answer
		setQuestions((prevQuestions) =>
			prevQuestions.map((q) =>
				q.id === questionId
					? {
							...q,
							user_answer: answer,
							is_correct: answer === q.correct_answer ? 1 : 0,
					  }
					: q
			)
		);
	};

	const completeQuiz = () => {
		setIsCompleted(true);
		console.log(questions);
	};

	const resetQuiz = () => {
		setCurrentQuestionIndex(0);
		setUserAnswers({});
		setIsCompleted(false);
		setQuestions(parsedQuestions);
	};

	const calculateScore = () => {
		const correct = questions.filter((q) => q.is_correct === 1).length;
		return {
			correct,
			total: totalQuestions,
			percentage: Math.round((correct / totalQuestions) * 100),
		};
	};

	// Function to get the updated questions with user answers in the original format
	const getUpdatedQuestionsForSubmission = (): QuizQuestion[] => {
		return originalQuestions.map((originalQuestion) => {
			const userAnswer = userAnswers[originalQuestion.id];
			return {
				...originalQuestion,
				user_answer: userAnswer || null,
				is_correct: userAnswer === originalQuestion.correct_answer ? 1 : 0,
			};
		});
	};

	return (
		<QuizContext.Provider
			value={{
				questions,
				currentQuestionIndex,
				userAnswers,
				isCompleted,
				totalQuestions,
				goToQuestion,
				goToNextQuestion,
				goToPreviousQuestion,
				submitAnswer,
				completeQuiz,
				resetQuiz,
				calculateScore,
				getUpdatedQuestionsForSubmission,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
}
