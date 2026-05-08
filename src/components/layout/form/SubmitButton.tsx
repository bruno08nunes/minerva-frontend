"use client";

import { useFormStatus } from "react-dom";
import Button from "./Button";

export default function SubmitButton({ text }: { text: string }) {
    const { pending } = useFormStatus();

    const RotateLoadingComponent = () => (
        <span className="in-disabled:animate-spin in-disabled:text-2xl inline-block">↻</span>
    );

    return <Button text={pending ? <RotateLoadingComponent /> : text} disabled={pending} />;
}
