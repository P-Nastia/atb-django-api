import { Link, Outlet, useNavigate } from "react-router";
import React from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { clearTokens } from "../store/authSlice";
import {APP_ENV} from "../env";
import TopicsSidebar from "../components/bars/TopicsSideBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReddit} from "@fortawesome/free-brands-svg-icons";
import {ThemeToggleButton} from "../components/buttons/ThemeToggleButton.tsx";

const UserLayout: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearTokens());
        navigate("/login");
    };

    console.log("BASE_IMAGE",APP_ENV.MEDIA_BASE_URL_IMAGE);

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <header className="w-full sticky top-0 z-50 py-2 px-6 bg-gray-50 dark:bg-gray-900 shadow-md flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
                <div className="hidden items-center gap-1 lg:flex">
                    <FontAwesomeIcon className={'text-4xl text-purple-500 dark:text-purple-400'} icon={faReddit} />
                    <Link to="/" className="text-2xl font-semibold font-['Comic_Sans_MS'] text-gray-900 dark:text-white">
                        reddka
                    </Link>
                </div>

                <ThemeToggleButton />


                <div className="flex items-center gap-4">
                    <Link
                        to="/createPost"
                        className="bg-purple-500 dark:bg-purple-600 hover:bg-purple-600 dark:hover:bg-purple-700
             text-white font-extrabold text-2xl
             w-10 h-10 flex items-center justify-center
             rounded-full transition"
                    >
                        +
                    </Link>
                    {user ? (
                        <>

                            <div className="flex items-center gap-3">
                                {user.image && (
                                    <img
                                        src={APP_ENV.MEDIA_BASE_URL_IMAGE + user.image}
                                        alt={user.username}
                                        className="w-8 h-8 rounded-full border border-gray-300 dark:border-white"
                                    />
                                )}
                                <div className="flex flex-col leading-tight">
                                    <span className="font-medium text-gray-900 dark:text-white">{user.username}</span>
                                    <span className="text-xs text-gray-600 dark:text-gray-200">{user.email}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                            >
                                Вихід
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="bg-purple-500 dark:bg-purple-600 px-4 py-2 rounded-full hover:bg-purple-600 dark:hover:bg-purple-700 transition text-white"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/register"
                                className="bg-gray-600 dark:bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition text-white"
                            >
                                Реєстрація
                            </Link>
                        </>
                    )}
                </div>
            </header>

            <main className="flex flex-1 p-6 gap-6 bg-gray-50 dark:bg-gray-900">
                <div className="w-64 sticky top-0 h-screen">
                    <TopicsSidebar />
                </div>
                <div className="flex-1">
                    <Outlet />
                </div>
            </main>


            <footer className="w-full py-3 px-6 text-sm text-center bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
                © 2025 Reddit clone. Усі права захищено.
            </footer>
        </div>
    );
};

export default UserLayout;
