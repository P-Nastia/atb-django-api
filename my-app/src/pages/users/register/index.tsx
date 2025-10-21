import React, {useState} from "react";
//import ImageUploader from "../../../components/imageUploader";
import InputField from "../../../components/inputFormTemplate";
import {type IRegisterFormData, useRegisterUserMutation} from "../../../services/userService";
import LoadingOverlay from "../../../components/loading";
import {useNavigate} from "react-router";
import CroppedImageUploader from "../../../components/uploaders/advancedCropper.tsx";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";

const UserRegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState<IRegisterFormData>({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirm: "",
        image: null,
    });
    const[register,{isLoading, error: registerError}] = useRegisterUserMutation();
    const {executeRecaptcha} = useGoogleReCaptcha();
    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            if(!executeRecaptcha) return;
            const token = await executeRecaptcha('register');

            const result = await register({...formData, recaptcha_token:token}).unwrap();
            console.log(result);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const validationChange = (isValid: boolean, fieldKey: string) => {
        if (isValid && errors.includes(fieldKey)) {
            setErrors(errors.filter((x) => x !== fieldKey));
        } else if (!isValid && !errors.includes(fieldKey)) {
            setErrors((state) => [...state, fieldKey]);
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
            {isLoading && <LoadingOverlay />}
            <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900 dark:text-white">REGISTER</h1>
                <p className={"dark:text-gray-200"}>Enter your information to register</p>
            </div>

            {/*<ImageUploader*/}
            {/*    onImageCropped={(file) => setFormData(prev => ({ ...prev, image: file }))}*/}
            {/*/>*/}

            <CroppedImageUploader
                round={true}
                onImageCropped={(file:any) => setFormData(prev => ({ ...prev, image: file }))}
            />

            <form onSubmit={handleSubmit}>
                {registerError && (
                    <>
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
                            role="alert">
                            <span className="font-medium">Перевірте правильність введених даних!</span>
                        </div>
                    </>
                )}
                    <InputField
                        name="username" label="Nickname" placeholder="john_doe" value={formData.username} onChange={handleChange}
                        rules={[
                            {
                                rule: "required",
                                message:" Нікнейм є обов'язковим"
                            }
                        ]}
                        onValidationChange={validationChange}
                    />

                    <InputField
                        name="first_name" label="First name" placeholder="John" value={formData.first_name} onChange={handleChange}
                        rules={[
                            {
                                rule: "required",
                                message:" Ім'я є обов'язкове"
                            }
                        ]}
                        onValidationChange={validationChange}
                    />

                    <InputField
                        name="last_name" label="Last name" placeholder="Doe" value={formData.last_name} onChange={handleChange}
                        rules={[
                            {
                                rule: "required",
                                message:" Прізвище є обов'язкове"
                            }
                        ]}
                    />

                    <InputField
                        name="email" label="Email" type="email"  placeholder="johnsmith@example.com" value={formData.email} onChange={handleChange}
                        rules={[
                            {
                                rule: "required",
                                message:" Пошта є обов'язкова"
                            }
                        ]}
                    />

                    <InputField
                        name="password" label="Password" type="password" placeholder="********" value={formData.password} onChange={handleChange}
                        rules={[
                            {
                                rule: "required",
                                message:" Пароль є обов'язковим"
                            }
                        ]}
                    />

                    <InputField
                        name="password_confirm"  label="Confirm Password" type="password" placeholder="********" value={formData.password_confirm} onChange={handleChange}
                        rules={[
                            {
                                rule: "required",
                                message:" Пароль є обов'язковим"
                            }
                        ]}
                    />

            <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                    <button type={"submit"} className="block w-full max-w-xs mx-auto bg-yellow-500 hover:bg-yellow-700 text-white rounded-lg px-3 py-3 font-semibold">
                        REGISTER NOW
                    </button>
                </div>
            </div>
                </form>
        </div>
        </div>
                </div>
                </div>
    );
};


export default UserRegisterPage;