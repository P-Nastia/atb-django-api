import React from "react";

interface InputFieldProps {
    name: string;
    label: string;
    type?: "text" | "email" | "password";
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const InputField: React.FC<InputFieldProps> = ({
                                                   name,
                                                   label,
                                                   type = "text",
                                                   placeholder,
                                                   value,
                                                   onChange,
                                               }) => {
    return (
        <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
        <div className="mb-5 px-3">
            <label htmlFor={name} className="text-xs font-semibold px-1 block mb-1">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                className={"w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-yellow-500"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
            </div>
        </div>
    );
};

export default InputField;