import React from "react";
import ImageUploader from "../../../components/imageUploader";
import InputField from "../../../components/inputFormTemplate";
import {type IRegisterFormData, useRegisterUserMutation} from "../../../services/userService";
import LoadingOverlay from "../../../components/loading";
//import {useNavigate} from "react-router";

const UserRegisterPage: React.FC = () => {
    //const navigate = useNavigate();
    const [formData, setFormData] = React.useState<IRegisterFormData>({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirm: "",
        imageFile: null,
    });
    const[register,{isLoading}] = useRegisterUserMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const result = await register(formData).unwrap();
            console.log(result);
            //navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-5">
        <div className="w-full md:w-1/2 py-10 px-5 md:px-10 items-center">
            {isLoading && <LoadingOverlay />}
            <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                <p>Enter your information to register</p>
            </div>

            <ImageUploader
                onImageCropped={(file) => setFormData(prev => ({ ...prev, imageFile: file }))}
            />

            <div>
                <div className="w-1/2 px-3 mb-5">
                    <InputField
                        name="username" label="Nickname" placeholder="john_doe" value={formData.username} onChange={handleChange}
                    />
                </div>

                <div className="w-1/2 px-3 mb-5">
                    <InputField
                        name="first_name" label="First name" placeholder="John" value={formData.first_name} onChange={handleChange}
                    />
                </div>

                <div className="w-1/2 px-3 mb-5">
                    <InputField
                        name="last_name" label="Last name" placeholder="Doe" value={formData.last_name} onChange={handleChange}
                    />
                </div>
            </div>

            <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                    <InputField
                        name="email" label="Email" type="email"  placeholder="johnsmith@example.com" value={formData.email} onChange={handleChange}
                    />
                </div>
            </div>

            <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                    <InputField
                        name="password" label="Password" type="password" placeholder="********" value={formData.password} onChange={handleChange}
                    />
                </div>
            </div>

            <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                    <InputField
                        name="password_confirm"  label="Confirm Password" type="password" placeholder="********" value={formData.password_confirm} onChange={handleChange}
                    />
                </div>
            </div>

            <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                    <button onClick={handleSubmit} className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                        REGISTER NOW
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};


export default UserRegisterPage;