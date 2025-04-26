import { useAuth } from "@/hooks/useAuth";
import { memo } from "react";
import { NavLink } from "react-router";
import { Button } from "../ui/button";
const ProfileSidebar = () => {
	const { logOut } = useAuth();
	return (
		<aside className=" flex flex-col gap-4 p-8  border-r-2 border-gray-400">
			<div className="flex items-center gap-2">
				<NavLink
					to=""
					className={({ isActive }) => (isActive ? "text-green-500" : "")}
					end
				>
					<Button variant="link" className="text-inherit hover:scale-110">
						{" "}
						Profile
					</Button>
				</NavLink>
			</div>
			<div className="flex items-center gap-2">
				<NavLink
					to="roadmaps"
					className={({ isActive }) => (isActive ? "text-green-500" : "")}
				>
					<Button variant="link" className="text-inherit hover:scale-110">
						{" "}
						Roadmaps
					</Button>
				</NavLink>
			</div>
			<div className="flex items-center gap-2">
				<NavLink
					to="plans"
					className={({ isActive }) => (isActive ? "text-green-500" : "")}
				>
					<Button variant="link" className="text-inherit hover:scale-110">
						{" "}
						Plans
					</Button>
				</NavLink>
			</div>
			<div className="flex items-center gap-2 mt-auto mb-20">
				<Button
					variant="link"
					className="text-red-500 hover:scale-110"
					onClick={logOut}
				>
					Log out
				</Button>
			</div>
		</aside>
	);
};

export default memo(ProfileSidebar);
