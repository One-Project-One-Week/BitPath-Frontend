import ErrorDisplay from "@/components/common/ErrorDisplay";
import PageTransition from "@/components/common/PageTransition";
import PlanCard from "@/components/plans/PlanCard";
import { planApi } from "@/services/planApi";
import { Plan } from "@/types";
import { useQuery } from "@tanstack/react-query";

const MyPlans = () => {
	const { data, isSuccess, isError, error, isLoading } = useQuery({
		queryFn: planApi.getPlansByUserId,
		queryKey: ["MyPlans"],
	});

	return (
		<main className="px-6  py-12">
			<h1 className="text-3xl font-bold mb-8">Study Plans</h1>
			{isError && (
				<div className="text-center py-20">
					<ErrorDisplay
						error={error}
						resetError={() => {
							window.location.reload();
						}}
					/>
				</div>
			)}
			{isLoading && (
				<div className="text-center h-20 py-20">
					<PageTransition />
				</div>
			)}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{isSuccess &&
					data.map((plan: Plan) => <PlanCard key={plan.id} plan={plan} />)}
			</div>
		</main>
	);
};

export default MyPlans;
