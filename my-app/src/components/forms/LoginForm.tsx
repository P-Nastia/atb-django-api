import {Form, Input, type FormProps} from "antd";
import {useLoginByGoogleMutation, useLoginMutation} from "../../services/userService.ts";
import {useDispatch} from "react-redux";
import {setTokens} from "../../store/authSlice.ts";
import {Link, useNavigate} from "react-router";
import type {ILoginRequest} from "../../types/users";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {useGoogleLogin} from "@react-oauth/google";
import LoadingOverlay from "../loading";

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
                await loginByGoogle(tokenResponse.access_token).unwrap();
                // dispatch(loginSuccess(result.token));
                navigate('/');
            } catch (error) {

                console.log("User server error auth", error);

            }
        },
    });

    return (
        <>
            {(isLoading || isGoogleLoading)  && <LoadingOverlay />}

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ width: "100%" }}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: "Please enter your email" },
                    ]}
                >
                    <Input placeholder="johnsmith@example.com" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please enter your password" }]}
                >
                    <Input.Password placeholder="********" />
                </Form.Item>

                <Link to="/forgot-password">Forgot password?</Link>

                <Form.Item>
                    <button
                        type="submit"
                        className="bg-yellow-500 hover:bg-orange-600 transition text-white font-semibold px-4 py-2 rounded w-full mt-4"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>

                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            loginUseGoogle();
                        }}
                        className="bg-blue-500 hover:bg-blue-600 transition text-white font-semibold px-4 py-2 rounded w-full mt-4"
                    >
                        {'LoginGoogle'}
                    </button>
                </Form.Item>
            </Form>
        </>

    );
};

export default LoginForm;