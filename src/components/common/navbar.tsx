import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
	const { auth } = useAuth();
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			// Get current scroll position
			const currentScrollPos = window.scrollY;

			// Set the navbar visible if scrolling up, hidden if scrolling down
			setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

			// Update previous scroll position
			setPrevScrollPos(currentScrollPos);
		};

		// Add scroll event listener
		window.addEventListener("scroll", handleScroll);

		// Clean up the event listener on component unmount
		return () => window.removeEventListener("scroll", handleScroll);
	}, [prevScrollPos]);

	return (
		<div
			className={`flex flex-row justify-between border-b border-gray-300 hover:border-b-1 hover:border-gray-500 bg-white sticky z-50 top-0 left-0 w-full  transition-transform duration-300 select-none  ${
				visible ? "translate-y-0" : "-translate-y-full"
			}`}
		>
			<div className="ml-20 mt-4">
				<Link to="/" className="gap-2 flex flex-row">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="lucide lucide-git-compare-arrows-icon lucide-git-compare-arrows text-green-500 dark:text-green-300"
					>
						<circle cx="5" cy="6" r="3" />
						<path d="M12 6h5a2 2 0 0 1 2 2v7" />
						<path d="m15 9-3-3 3-3" />
						<circle cx="19" cy="18" r="3" />
						<path d="M12 18H7a2 2 0 0 1-2-2V9" />
						<path d="m9 15 3 3-3 3" />
					</svg>
					<h2 className="text-green-500 dark:text-green-300">BITPATH</h2>{" "}
					{/* Dynamic text color */}
				</Link>
			</div>

			<div
				className="mr-25
             mt-5 mb-5 "
			>
				<nav className="flex flex-row gap-10  ">
					<NavLink
						to="/showcase"
						className={({ isActive }) =>
							isActive ? "text-green-500" : "text-gray hover:scale-105"
						}
					>
						Showcase
					</NavLink>
					<NavLink
						to="/roadmap"
						className={({ isActive }) =>
							isActive ? "text-green-500" : "text-gray hover:scale-105"
						}
					>
						Roadmap
					</NavLink>
					<NavLink
						to="/leaderboard"
						className={({ isActive }) =>
							isActive ? "text-green-500" : "text-gray hover:scale-105"
						}
					>
						Leaderboard
					</NavLink>
					{auth ? (
						<NavLink
							to="/profile"
							className={({ isActive }) =>
								isActive ? "text-green-500" : "text-gray hover:scale-105"
							}
						>
							Profile
						</NavLink>
					) : (
						<NavLink
							to="/login"
							className={({ isActive }) =>
								isActive ? "text-green-500" : "text-gray hover:scale-105"
							}
						>
							Login
						</NavLink>
					)}
				</nav>
			</div>
		</div>
	);
}
