import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
    const { auth } = useAuth();
    return (
        <div className="flex flex-row justify-between border-b border-gray-300 hover:border-b-1 hover:border-gray-500 transition duration-200">
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
                    <h2 className="text-green-500 dark:text-green-300">
                        BITPATH
                    </h2>{" "}
                    {/* Dynamic text color */}
                </Link>
            </div>

            <div
                className="mr-25
             mt-5 mb-5"
            >
<<<<<<< HEAD
                
=======
                <ul className="flex flex-row gap-10 ">
                   
                    <li className="hover:font-semibold text-sm  flex-grow-1">
>>>>>>> main
                        <NavLink
                            to="/leaderboard"
                            className={({ isActive }) =>
                                isActive ? "text-green-500" : "text-gray"
                            }
                        >
                            Leaderboard
                        </NavLink>
                    </li>
<<<<<<< HEAD
                    <li className="hover:font-semibold text-sm  flex-grow-1">
=======
                    
>>>>>>> main
                        <NavLink
                            to="/roadmap"
                            className={({ isActive }) =>
                                isActive ? "text-green-500" : "text-gray"
                            }
                        >
                            Roadmap
                        </NavLink>
                    </li>
                    {auth ? (
<<<<<<< HEAD
                        <li className="hover:font-semibold text-sm flex-grow-1">
=======
                        
>>>>>>> main
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    isActive ? "text-green-500" : "text-gray"
                                }
                            >
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
                                    className="lucide lucide-smile-icon lucide-smile text-gray"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                    <line x1="9" x2="9.01" y1="9" y2="9" />
                                    <line x1="15" x2="15.01" y1="9" y2="9" />
                                </svg>
                            </NavLink>
                        </li>
                    ) : (
<<<<<<< HEAD
                        <li className="hover:font-semibold text-sm  flex-grow-1">
=======
                        
>>>>>>> main
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive ? "text-green-500" : "text-gray"
                                }
                            >
                                About
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
