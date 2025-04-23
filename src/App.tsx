import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import AppLayout from "./components/common/AppLayout";

import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/common/ProtectedRoute";

const About = lazy(() => import("./pages/about"));

const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
function App() {
    const location = useLocation();
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route
                    index
                    element={
                        <Suspense key={location.pathname}>
                            <Home />
                        </Suspense>
                    }
                />
                <Route path="about">
                    <Route
                        index
                        element={
                            <Suspense key={location.pathname}>
                                <ProtectedRoute>
                                    <About />
                                </ProtectedRoute>
                            </Suspense>
                        }
                    />
                </Route>
                <Route
                    path=""
                    element={<Suspense key={location.pathname}></Suspense>}
                />
                <Route
                    path="about"
                    element={
                        <Suspense key={location.pathname}>
                            {" "}
                            <About />{" "}
                        </Suspense>
                    }
                />
                <Route path="*" element={<div>404</div>} />
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>
    );
}

export default App;
