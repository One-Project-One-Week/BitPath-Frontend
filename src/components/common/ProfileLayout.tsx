import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Outlet } from "react-router";

const ProfileLayout = () => {
	const { profile } = useAuth();
	console.log(profile);
	return (
		<section className="flex min-h-screen">
			<aside className=" flex flex-col gap-4 p-8 m-8 border-r-2 border-gray-400">
				<motion.div
					initial={{ x: -100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
					whileHover={{ scale: 1.1 }}
					className="flex items-center gap-2"
				>
					Profile
				</motion.div>
				<motion.div
					initial={{ x: -100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					whileHover={{ scale: 1.1 }}
					className="flex items-center gap-2"
				>
					Roadmaps
				</motion.div>
				<motion.div
					initial={{ x: -100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					whileHover={{ scale: 1.1 }}
					className="flex items-center gap-2"
				>
					Plans
				</motion.div>
			</aside>
			<Separator orientation="vertical" className="h-full w-8 bg-red-700" />
			<main>
				<Outlet />
			</main>
		</section>
	);
};

export default ProfileLayout;
