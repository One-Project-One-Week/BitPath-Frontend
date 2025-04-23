import { Outlet } from "react-router";

const AppLayout = () => {
    return (
        <main>
            <Outlet />
        </main>
    );
};

export default AppLayout;
