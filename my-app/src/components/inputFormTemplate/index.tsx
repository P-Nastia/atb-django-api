import React from "react";

interface InputFieldProps {
    name: string;
    label: string;
    type?: "text" | "email" | "password";
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const inputClass = "w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500";

const InputField: React.FC<InputFieldProps> = ({
                                                   name,
                                                   label,
                                                   type = "text",
                                                   placeholder,
                                                   value,
                                                   onChange,
                                               }) => {
    return (
        <div className="mb-5 px-3">
            <label htmlFor={name} className="text-xs font-semibold px-1 block mb-1">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                className={inputClass}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default InputField;