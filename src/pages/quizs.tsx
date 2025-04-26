import ErrorDisplay from "@/components/common/ErrorDisplay";
import PageTransition from "@/components/common/PageTransition";
import QuizContainer from "@/components/quiz/QuizContainer";
import { taskApi } from "@/services/taskApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const Quizs = () => {
	const { quizId } = useParams();
	console.log(quizId);
	const {
		data: quizQuestions,
		isLoading,
		isError,
		error,
		isSuccess,
	} = useQuery({
		queryKey: ["quiz", quizId],
		queryFn: () => taskApi.getQuizQuestions(Number(quizId)),
	});
	return (
		<div>
			{isLoading && (
				<div className="h-[30vh]">
					<PageTransition />
				</div>
			)}
			{isError && (
				<div className="text-center p-20">
					<ErrorDisplay
						error={error}
						resetError={() => {
							window.location.reload();
						}}
					/>
				</div>
			)}
			{isSuccess && (
				<QuizContainer questions={quizQuestions} title="Knowledge Check" />
			)}
		</div>
	);
};

export default Quizs;
