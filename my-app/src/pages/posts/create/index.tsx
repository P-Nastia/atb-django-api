import React, {useState} from "react";
import InputField from "../../../components/inputFormTemplate";
import LoadingOverlay from "../../../components/loading";
import {useNavigate} from "react-router";
import type {IPostCreate} from "../../../types/posts";
import {useGetRootTopicsQuery} from "../../../services/topicService.ts";
import {useCreatePostMutation} from "../../../services/postService.ts";

const CreatePostPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState<IPostCreate>({
        title: "",
        body: "",
        image: null,
        video: null,
        video_url: "",
        topic_id: 0,
        user_id: 1,
    });
    const { data: topics, isLoading: isLoadingTopics } = useGetRootTopicsQuery();
    const [ create, {isLoading, error: isCreateError} ] = useCreatePostMutation();

    if(topics){
        console.log("TOPICS",topics);
    }

    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(formData);
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const result = await create(formData).unwrap();
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
                    <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-yellow-500 py-10 px-10 text-center text-white">
                        <h2 className="font-bold text-3xl mb-4">Welcome to Your Creative Space ✨</h2>
                        <p className="text-lg mb-6">
                            Share your ideas, stories, or knowledge with the world. Start by creating your post!
                        </p>
                        <img
                            src="https://media.tenor.com/7cQ9-ELrjfYAAAAM/cat-typing-on-keyboard---i%27m-cooking.gif"
                            alt="Writing illustration"
                            className="w-64"
                        />
                    </div>
                    <div className="w-full md:w-1/2 py-10 px-5 md:px-10 dark:bg-gray-800">
                        {isLoading || isLoadingTopics && <LoadingOverlay />}
                        <div className="text-center mb-10">
                            <h1 className="font-bold text-3xl text-gray-900 dark:text-white">Create post</h1>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {isCreateError && (
                                <>
                                    <div
                                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
                                        role="alert">
                                        <span className="font-medium">Перевірте правильність введених даних!</span>
                                    </div>
                                </>
                            )}
                            <InputField
                                name="title" label="Title" placeholder="title" value={formData.title} onChange={handleChange}
                                rules={[
                                    {
                                        rule: "required",
                                        message:" Заголовок є обов'язковим"
                                    }
                                ]}
                                onValidationChange={validationChange}
                            />

                            <InputField
                                name="body" label="Body" placeholder="Body" value={formData.body} onChange={handleChange}
                                rules={[
                                    {
                                        rule: "required",
                                        message:"Вміст є обов'язковим"
                                    }
                                ]}
                                onValidationChange={validationChange}
                            />

                            <label
                                htmlFor="image-upload"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Image
                            </label>
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setFormData((prev) => ({
                                            ...prev,
                                            image: file,
                                        }));
                                    }
                                }}
                                className="block w-full mt-3 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            />
                            <label
                                htmlFor="video-upload"
                                className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Video
                            </label>
                            <input
                                type="file"
                                id={"video-upload"}
                                accept="video/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setFormData((prev) => ({
                                            ...prev,
                                            video: file,
                                        }));
                                    }
                                }}
                                className="block w-full mt-3 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            />

                            <InputField
                                name="last_name" label="Last name" placeholder="Doe" value={formData.video_url} onChange={handleChange}
                            />

                            <label htmlFor="topics"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                            <select id="topics"
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            topic_id: Number(e.target.value),
                                        }))
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                <option value={0}>Select a topic</option>
                                {topics &&
                                    topics
                                        .flatMap((topic) => topic.children || [])
                                        .map((child) => (
                                            <option key={child.id} value={child.id}>
                                                {child.name}
                                            </option>
                                        ))}
                            </select>

                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <button type={"submit"} className=" mt-3 block w-full max-w-xs mx-auto bg-yellow-500 hover:bg-yellow-700 text-white rounded-lg px-3 py-3 font-semibold">
                                        Upload post
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


export default CreatePostPage;