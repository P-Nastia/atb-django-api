import {Form, type FormProps} from "antd";
import {useLoginByGoogleMutation, useLoginMutation} from "../../services/userService.ts";
import {useDispatch} from "react-redux";
import {setTokens} from "../../store/authSlice.ts";
import {Link, useNavigate} from "react-router";
import type {ILoginRequest} from "../../types/users";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {useGoogleLogin} from "@react-oauth/google";
import LoadingOverlay from "../loading";
import InputField from "../inputFormTemplate";
import {useState} from "react";

const LoginForm: React.FC = () => {
    const [form] = Form.useForm();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {executeRecaptcha} = useGoogleReCaptcha();
    const [loginByGoogle, { isLoading: isGoogleLoading }] = useLoginByGoogleMutation();


    const onFinish: FormProps<ILoginRequest>["onFinish"] = async (values) => {
        try {
            if(!executeRecaptcha) return;
            const token = await executeRecaptcha('login');

            const result = await login({...values, recaptcha_token:token}).unwrap();
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
        <>
            {(isLoading || isGoogleLoading)  && <LoadingOverlay />}

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ width: "100%" }}
                className={"bg-white dark:bg-gray-800"}
            >
                <InputField
                    label={"Username"}
                    name="username"
                    placeholder="john@example.com"
                    rules = {[{
                        rule: 'regexp',
                        value: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
                        message: "Пошта є некоректна"
                    },
                        {
                            rule: 'required',
                            message: "Пошта є обов'язкова"
                        }
                    ]}
                 onValidationChange={validationChange} />

                <InputField
                    onValidationChange={validationChange}
                    label={"Password"}
                    name="username"
                    type={"password"}
                    placeholder={"********"}
                    rules={[
                        {
                            rule: "required",
                            message:" Пароль є обов'язковим"
                        }
                    ]}
                />


                <Link to="/forgot-password">Forgot password?</Link>

                <Form.Item>
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
                </Form.Item>
            </Form>
        </>

    );
};

export default LoginForm;