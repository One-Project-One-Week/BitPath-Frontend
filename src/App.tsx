import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import AppLayout from "./components/common/AppLayout";
import PageTransition from "./components/common/PageTransition";
import ProfileLayout from "./components/common/ProfileLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { Home, SignUp } from "./pages";
import ShowCase from "./pages/showcase";

const Profile = lazy(() => import("./pages/profile"));
const Roadmap = lazy(() => import("./pages/roadmap"));
const MyRoadMaps = lazy(() => import("./pages/myroadmap"));
const MyPlans = lazy(() => import("./pages/myplan"));
const Login = lazy(() => import("./pages/login"));
const Myeachroadmap = lazy(() => import("./pages/myeachroadmap"));
const PlanRequest = lazy(() => import("./pages/planrequest"));
const Leaderboard = lazy(() => import("./pages/leaderboard"));
const MyEachPlan = lazy(() => import("./pages/myeachplan"));
const SharedEachRoadmap = lazy(() => import("./pages/sharedEachRoadmap"));
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
							<Suspense
								key={location.pathname}
								fallback={
									<section className="h-[70vh]">
										<PageTransition />
									</section>
								}
							>
								<Roadmap />
							</Suspense>
						}
					/>
				</Route>
				<Route path="showcase">
					<Route
						index
						element={
							<Suspense
								key={location.pathname}
								fallback={
									<section className="h-[70vh]">
										<PageTransition />
									</section>
								}
							>
								<ShowCase />
							</Suspense>
						}
					/>
					<Route
						path=":roadmapId"
						element={
							<Suspense
								key={location.pathname}
								fallback={
									<section className="h-[70vh]">
										<PageTransition />
									</section>
								}
							>
								<SharedEachRoadmap />
							</Suspense>
						}
					/>
				</Route>
				<Route
					path="leaderboard"
					element={
						<Suspense
							key={location.pathname}
							fallback={
								<section className="h-[70vh]">
									<PageTransition />
								</section>
							}
						>
							<Leaderboard />
						</Suspense>
					}
				/>
				<Route
					path="profile"
					element={
						<Suspense
							key={location.pathname}
							fallback={
								<section className="h-[70vh]">
									<PageTransition />
								</section>
							}
						>
							<ProtectedRoute>
								<ProfileLayout />
							</ProtectedRoute>
						</Suspense>
					}
				>
					<Route
						index
						element={
							<Suspense
								key={location.pathname}
								fallback={
									<section className="h-[70vh]">
										<PageTransition />
									</section>
								}
							>
								<Profile />
							</Suspense>
						}
					/>
					<Route path="roadmaps">
						<Route
							index
							element={
								<Suspense
									key={location.pathname}
									fallback={
										<section className="h-[70vh]">
											<PageTransition />
										</section>
									}
								>
									<MyRoadMaps />
								</Suspense>
							}
						/>
						<Route
							path=":id"
							element={
								<Suspense
									key={location.pathname}
									fallback={
										<section className="h-[70vh]">
											<PageTransition />
										</section>
									}
								>
									<Myeachroadmap />
								</Suspense>
							}
						/>
					</Route>
					<Route path="plans">
						<Route
							index
							element={
								<Suspense
									key={location.pathname}
									fallback={
										<section className="h-[70vh]">
											<PageTransition />
										</section>
									}
								>
									<MyPlans />
								</Suspense>
							}
						/>
						<Route
							path="request/:skill_id"
							element={
								<Suspense
									key={location.pathname}
									fallback={
										<section className="h-[70vh]">
											<PageTransition />
										</section>
									}
								>
									<PlanRequest />
								</Suspense>
							}
						/>
						<Route
							path=":planId"
							element={
								<Suspense
									key={location.pathname}
									fallback={
										<section className="h-[70vh]">
											<PageTransition />
										</section>
									}
								>
									<MyEachPlan />
								</Suspense>
							}
						/>
					</Route>
				</Route>

				<Route path="*" element={<div>404</div>} />
				<Route path="login" element={<Login />} />
				<Route path="SignUp" element={<SignUp />} />
			</Route>
		</Routes>
	);
}

export default App;
