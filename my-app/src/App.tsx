import './App.css'
import UsersListPage from "./pages/users/list";
import {Routes,Route} from "react-router"
import UserRegisterPage from "./pages/users/register";
import UserLayout from "./layouts/userLayout.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<UserLayout/>}>
                    <Route index element={<UsersListPage/>} />
                    <Route path={"register"} element={<UserRegisterPage/>} />
                </Route>
            </Routes>
        </>
    )
}

export default App
