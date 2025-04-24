import { Outlet } from "react-router";
import ProfileSidebar from "./ProfileSidebar";

const ProfileLayout = () => {
	return (
		<section className="flex min-h-screen">
			<ProfileSidebar />

			<main>
				<Outlet />
			</main>
		</section>
	);
};

export default ProfileLayout;
