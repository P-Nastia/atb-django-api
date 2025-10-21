import React, {useState} from "react";
import InputField from "../../../components/inputFormTemplate";
import LoadingOverlay from "../../../components/loading";
import {Link, useNavigate} from "react-router";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import type {ILoginRequest} from "../../../types/users";
import {useLoginByGoogleMutation, useLoginMutation} from "../../../services/userService.ts";
import {useGoogleLogin} from "@react-oauth/google";
import {setTokens} from "../../../store/authSlice.ts";
import { useDispatch } from "react-redux";

const UserLoginPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = React.useState<ILoginRequest>({
        username: "",
        password: "",
    });
    const[login,{isLoading, error: loginError}] = useLoginMutation();
    const {executeRecaptcha} = useGoogleReCaptcha();
    const [loginByGoogle, { isLoading: isGoogleLoading }] = useLoginByGoogleMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            if(!executeRecaptcha) return;
            const token = await executeRecaptcha('login');

            const result = await login({
                ...formData,
                recaptcha_token: token,
            }).unwrap();
            console.log(result);
            dispatch(setTokens(result));
            navigate('/');
        } catch (err: any) {
            const errorMessage = err?.data?.errors?.Name?.[0];
            console.error(errorMessage);
        }
    };

    const loginUseGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) =>
        {
            try {
                console.log("tokenResponse",tokenResponse);
                const res = await loginByGoogle(tokenResponse.access_token).unwrap();
                dispatch(setTokens(res));
                console.log("res", res);
                // dispatch(loginSuccess(result.token));
                navigate('/');
            } catch (error) {

                console.log("User server error auth", error);

            }
        },
    });

    const [errors, setErrors] = useState<string[]>([]);

    const validationChange = (isValid: boolean, fieldKey: string) => {
        if (isValid && errors.includes(fieldKey)) {
            setErrors(errors.filter(x => x !== fieldKey))
        } else if (!isValid && !errors.includes(fieldKey)) {
            setErrors(state => [...state, fieldKey])
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-5">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-4xl">
                <div className="md:flex w-full">
                    <div className="hidden md:block w-1/2 bg-yellow-500 py-10 px-10">
                        <h2 className="text-white font-bold text-2xl">Welcome!</h2>
                    </div>
                    <div className="w-full md:w-1/2 py-10 px-5 md:px-10 dark:bg-gray-800">
                        {(isLoading || isGoogleLoading)  && <LoadingOverlay />}
                        <div className="text-center mb-10">
                            <h1 className="font-bold text-3xl text-gray-900 dark:text-white">LOGIN</h1>
                            <p className={"dark:text-gray-200"}>Enter your information to login</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {loginError && (
                                <>
                                    <div
                                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
                                        role="alert">
                                        <span className="font-medium">Перевірте правильність введених даних!</span>
                                    </div>
                                </>
                            )}
                            <InputField
                                name="username" label="Nickname" placeholder="john_doe" value={formData.username}
                                onChange={handleChange}
                                onValidationChange={validationChange}
                                rules = {[
                                    {
                                        rule: 'required',
                                        message: "Нікнейм є обов'язковий"
                                    }
                                ]}
                            />

                            <InputField
                                name="password" label="Password" type="password" placeholder="********" value={formData.password} onChange={handleChange}
                                onValidationChange={validationChange}
                                rules={[
                                    {
                                        rule: "required",
                                        message:" Пароль є обов'язковим"
                                    }
                                ]}
                            />
                            <Link
                                to="/forgot-password"
                                className="block text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                            >
                                Forgot password?
                            </Link>

                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <button
                                        type="submit"
                                        className="bg-yellow-500 hover:bg-orange-600 cursor-pointer transition text-white font-semibold px-4 py-2 rounded w-full mt-4"
                                    >
                                        {isLoading ? 'Logging in...' : 'Login'}
                                    </button>
                                    <div className="flex justify-center mt-4">
                                        <button
                                            onClick={(event) => {
                                                event.preventDefault();
                                                loginUseGoogle();
                                            }}
                                            className="flex items-center justify-center bg-white border border-gray-300 hover:shadow-md transition p-2 rounded-full w-10 h-10"
                                            title="Login with Google"
                                        >
                                            <img src="src/icons/google.png"  alt="Google Login" className="w-5 h-5 cursor-pointer" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </div>
    );
};


export default UserLoginPage;