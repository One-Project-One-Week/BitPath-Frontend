import { Plus } from "lucide-react";
import { Link } from "react-router";

const CreateNewCard = () => {
	return (
		<Link
			to="/roadmap"
			className="block h-48 rounded-lg p-6 bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg group"
		>
			<div className="h-full flex flex-col justify-between">
				<h2 className="text-xl font-semibold text-white">Create New Roadmap</h2>
				<div className="flex justify-end">
					<Plus className="text-white opacity-70 group-hover:opacity-100 transform group-hover:scale-110 transition-all" />
				</div>
			</div>
		</Link>
	);
};

export default CreateNewCard;
