import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import AppLayout from "./components/common/AppLayout";
import PageTransition from "./components/common/PageTransition";
import ProfileLayout from "./components/common/ProfileLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { Home } from "./pages";

const Profile = lazy(() => import("./pages/profile"));
const Roadmap = lazy(() => import("./pages/roadmap"));
const MyRoadMaps = lazy(() => import("./pages/myroadmap"));
const MyPlans = lazy(() => import("./pages/myplan"));
const Login = lazy(() => import("./pages/login"));
function App() {
	const location = useLocation();
	return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route index element={<Home />} />
				<Route path="roadmap">
					<Route
						index
						element={
							<Suspense key={location.pathname} fallback={<PageTransition />}>
								<Roadmap />
							</Suspense>
						}
					/>
				</Route>
				<Route
					path="profile"
					element={
						<Suspense key={location.pathname} fallback={<PageTransition />}>
							<ProtectedRoute>
								<ProfileLayout />
							</ProtectedRoute>
						</Suspense>
					}
				>
					<Route
						index
						element={
							<Suspense key={location.pathname} fallback={<PageTransition />}>
								<Profile />
							</Suspense>
						}
					/>
					<Route
						path="roadmaps"
						element={
							<Suspense key={location.pathname} fallback={<PageTransition />}>
								<MyRoadMaps />
							</Suspense>
						}
					/>
					<Route
						path="plans"
						element={
							<Suspense key={location.pathname} fallback={<PageTransition />}>
								<MyPlans />
							</Suspense>
						}
					/>
				</Route>

				<Route path="*" element={<div>404</div>} />
				<Route path="login" element={<Login />} />
			</Route>
		</Routes>
	);
}

export default App;
