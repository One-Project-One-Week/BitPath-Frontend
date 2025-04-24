import { Outlet } from "react-router";
import Header from "./navbar";
import Footer from "./footer";

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
