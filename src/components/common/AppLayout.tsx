import { Outlet } from "react-router";

import Footer from "./footer";
import Header from "./navbar";

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
