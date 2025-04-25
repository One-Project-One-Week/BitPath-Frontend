import { Outlet } from "react-router";

import Header from "./Navbar";
import Footer from "./Footer";


const AppLayout = () => {
	return (
		<main>
			<Header />
			<Outlet />
			<Footer />
		</main>
	);
};

export default AppLayout;
