import { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    id: string;
}

export default function Textarea({
    label,
    id,
    ...rest
}: TextareaProps) {
    return (
        <div className="flex flex-col gap-2 grow">
            {label !== undefined && (
                <label htmlFor={id} className="text-lavender-blush text-xl">
                    {label}
                </label>
            )}
            <textarea
                id={id}
                name={id}
                className="bg-white p-1.5 rounded-md"
                {...rest}
            ></textarea>
        </div>
    );
}
