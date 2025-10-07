import React, {useState} from "react";
import {Form, Input, Button, Row, Col, type UploadFile, type FormProps} from "antd";
import {useRegisterAntdMutation} from "../../services/userService.ts";
import type {IRegisterFormData} from "../../services/userService.ts";
import ImageUploader from "../uploaders/antdImageUploader.tsx";
import {useDispatch} from "react-redux";
import {setTokens} from "../../store/authSlice.ts";
import {useNavigate} from "react-router";

const RegisterForm: React.FC = () => {
    const [form] = Form.useForm();
    const [register, { isLoading }] = useRegisterAntdMutation();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [imageError, setImageError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish: FormProps<IRegisterFormData>["onFinish"] = async (values) => {
        if (fileList.length === 0 || !fileList[0]?.originFileObj) {
            setImageError(true);
            return;
        }

        const userRegister: IRegisterFormData = {
            ...values,
            image: fileList[0].originFileObj,
        };

        try {
            const result = await register(userRegister).unwrap();
            console.log(result);
            dispatch(setTokens(result));
            navigate('/');
        } catch (err: any) {
            const errorMessage = err?.data?.errors?.Name?.[0];
            console.error(errorMessage);
        }
    };

    return (
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
                    { required: true, message: "Please enter your username" }
                ]}
            >
                <Input placeholder="johnsmith" />
            </Form.Item>

            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="First name"
                        name="first_name"
                        rules={[{ required: true, message: "Please enter your first name" }]}
                    >
                        <Input placeholder="John" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Last name"
                        name="last_name"
                        rules={[{ required: true, message: "Please enter your last name" }]}
                    >
                        <Input placeholder="Smith" />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Invalid email format" },
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

            <Form.Item
                label="Password Confirmation"
                name="password_confirm"
                rules={[{ required: true, message: "Please enter your password again" }]}
            >
                <Input.Password placeholder="********" />
            </Form.Item>

            <Form.Item
                label="Зображення"
                required
                validateStatus={imageError ? "error" : ""}
                className="w-full text-center"
            >
                <ImageUploader
                    fileList={fileList}
                    setFileList={setFileList}
                    imageError={imageError}
                    setImageError={setImageError}
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    block
                    style={{ height: "40px", fontWeight: 600 }}
                >
                    REGISTER NOW
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;