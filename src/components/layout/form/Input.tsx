import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id: string;
}

export default function Input({
    label,
    id,
    type = "text",
    ...rest
}: InputProps) {
    return (
        <div className="flex flex-col gap-2 grow">
            {label !== undefined && (
                <label htmlFor={id} className="text-lavender-blush text-xl">
                    {label}
                </label>
            )}
            <input
                type={type}
                id={id}
                name={id}
                className="bg-white p-1.5 rounded-md"
                {...rest}
            />
        </div>
    );
}
