import './App.css'
import UsersListPage from "./pages/users/list";
import {Routes,Route} from "react-router"
import UserRegisterPage from "./pages/users/register";

function App() {
    return (
        <>
            <Routes>
                <Route path={"/"}>
                    <Route index element={<UsersListPage/>} />
                    <Route path={"register"} element={<UserRegisterPage/>} />
                </Route>
            </Routes>
        </>
    )
}

export default App
