import { motion } from "framer-motion";
import { memo } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";

const ProfileSidebar = () => {
	console.log(" ProfileSidebar render");
	return (
		<aside className=" flex flex-col gap-4 p-8 m-8 border-r-2 border-gray-400">
			<motion.div
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
				whileHover={{ scale: 1.1 }}
				className="flex items-center gap-2"
			>
				<Link to="">
					<Button variant="link" className="">
						{" "}
						Profile
					</Button>
				</Link>
			</motion.div>
			<motion.div
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				whileHover={{ scale: 1.1 }}
				className="flex items-center gap-2"
			>
				<Link to="roadmaps">
					<Button variant="link" className="">
						{" "}
						Roadmaps
					</Button>
				</Link>
			</motion.div>
			<motion.div
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.4 }}
				whileHover={{ scale: 1.1 }}
				className="flex items-center gap-2"
			>
				<Link to="plans">
					<Button variant="link" className="">
						{" "}
						Plans
					</Button>
				</Link>
			</motion.div>
		</aside>
	);
};

export default memo(ProfileSidebar);
