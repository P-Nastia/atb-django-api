import './App.css'
import UsersListPage from "./pages/users/list";
import {Routes,Route} from "react-router"
import UserRegisterPage from "./pages/users/register";
import UserLayout from "./layouts/userLayout.tsx";
import UserRegisterPageAntd from "./pages/users/register/antdRegister.tsx";
import ForgotPasswordPage from "./pages/users/resetPassword/forgotPasswordPage.tsx";
import ResetPasswordPage from "./pages/users/resetPassword/resetPasswordPage.tsx";
import SuccessPage from "./pages/users/resetPassword/successPage.tsx";
import UserLoginPage from "./pages/users/login";

function App() {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<UserLayout/>}>
                    <Route index element={<UsersListPage/>} />
                    <Route path={"register"} element={<UserRegisterPage/>} />
                    <Route path={"login"} element={<UserLoginPage/>} />
                    <Route path={"registerAntd"} element={<UserRegisterPageAntd/>} />
                    <Route path={"forgot-password"} element={<ForgotPasswordPage/>} />
                    <Route path={"reset-password/:uid/:token"} element={<ResetPasswordPage/>} />
                    <Route path={"success-confirm"} element={<SuccessPage/>} />

                </Route>
            </Routes>
        </>
    )
}

export default App
