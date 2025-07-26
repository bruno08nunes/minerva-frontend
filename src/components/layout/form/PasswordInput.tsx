"use client";

import { useState } from "react";
import Input, { InputProps } from "./Input";
import { Eye, EyeClosed } from "lucide-react";

export default function PasswordInput(props: InputProps) {
    const [isText, setIsText] = useState(false);

    return (
        <div className="flex flex-col gap-2 grow">
            <label htmlFor={props.id} className="text-lavender-blush text-xl">
                {props.label}
            </label>
            <div className="flex grow bg-white rounded-md">
                <Input
                    {...props}
                    type={isText ? "text" : "password"}
                    label={undefined}
                />
                <button
                    type="button"
                    onClick={() => setIsText((state) => !state)}
                    className="p-1 px-2 border-l-black border-l cursor-pointer"
                >
                    {isText ? <Eye /> : <EyeClosed />}
                </button>
            </div>
        </div>
    );
}
