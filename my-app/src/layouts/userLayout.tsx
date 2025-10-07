import {Link, Outlet} from "react-router";

const UserLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
            <header className="w-full py-4 px-6 bg-yellow-500 text-white shadow-md flex items-center">
                <div className="ml-auto flex space-x-4">
                    <Link
                        to="login"
                        className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-orange-100 hover:text-yellow-800 transition"
                    >
                        Вхід
                    </Link>

                    <Link
                        to="register"
                        className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-orange-100 hover:text-yellow-800 transition"
                    >
                        Реєстрація
                    </Link>
                    <Link
                        to="registerAntd"
                        className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-orange-100 hover:text-yellow-800 transition"
                    >
                        Реєстрація antd
                    </Link>
                </div>
            </header>

            <main className="flex-1 p-4 md:p-6">
                <Outlet />
            </main>

            <footer className="w-full py-3 px-6 bg-gray-100 text-sm text-center dark:bg-gray-800 dark:text-gray-300">
                © 2025 ATB. Усі права захищено.
            </footer>
        </div>
    );
};
export default UserLayout;
