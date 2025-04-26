import RequestPlanForm from "@/components/plans/RequestPlanForm";
import { useLocation } from "react-router";

const PlanRequest = () => {
	const { state } = useLocation();

	return (
		<section className="mx-auto py-20">
			<h1 className="text-center text-2xl text-gray-500  font-semibold mb-8">
				Request Study Plan for {state.skill}
			</h1>
			<RequestPlanForm />
		</section>
	);
};

export default PlanRequest;
