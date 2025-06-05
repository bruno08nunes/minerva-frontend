import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export default function Button({ text, ...rest }: ButtonProps) {
    return (
        <button
            className="bg-[#613659] text-[#D3B1C2] rounded-4xl py-1.5 px-6 text-lg max-w-[200px] mx-auto cursor-pointer"
            {...rest}
        >
            {text}
        </button>
    );
}
