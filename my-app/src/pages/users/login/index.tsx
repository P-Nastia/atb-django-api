import React from "react";
import { Typography, Card, Row, Col } from "antd";
import LoginForm from "../../../components/forms/LoginForm.tsx";

const { Title, Text } = Typography;

const UserLoginPage: React.FC = () => {
    return (
        <div
            className="
                min-h-screen flex items-center justify-center p-5
                bg-gray-100 dark:bg-gray-900 transition-colors duration-300
            "
        >
            <Card
                className="
                    w-full max-w-[900px] rounded-2xl overflow-hidden shadow-lg
                    bg-white dark:bg-gray-800 transition-colors duration-300
                "
                bodyStyle={{ padding: 0 }}
            >
                <Row>
                    <Col
                        xs={0}
                        md={12}
                        className="bg-yellow-500 p-10 flex flex-col justify-center"
                    >
                        <Title level={2} className="!text-white mb-2">
                            Welcome!
                        </Title>
                        <Text className="!text-white/80">
                            Glad to see you back.
                        </Text>
                    </Col>

                    <Col
                        xs={24}
                        md={12}
                        className="
                            p-10 bg-white dark:bg-gray-800
                            text-gray-900 dark:text-gray-100 transition-colors duration-300
                        "
                    >
                        <div className="text-center mb-6 dark:text-white">
                            <Title
                                level={3}
                                className="!mb-0 !text-gray-900 dark:!text-gray-100"
                            >
                                Login
                            </Title>
                            <Text className="!text-gray-900 dark:!text-gray-100">
                                Enter your information to login
                            </Text>
                        </div>

                        <LoginForm />
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default UserLoginPage;
