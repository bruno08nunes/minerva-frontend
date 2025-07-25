"use client";

import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { loginAction } from "@/action/login-action";
import { redirect } from "next/navigation";
import PasswordInput from "./PasswordInput";

export default function LoginForm() {
    const [state, formAction] = useActionState(loginAction, {
        success: false,
        message: null,
    });

    useEffect(() => {
        if (state.message && state.success === false) {
            toast.error(state.message, {
                duration: 3000,
                position: "top-center",
                style: { color: "red" } 
            });
        }

        if (state.success) {
            redirect("/");
        }
    }, [state]);

    return (
        <form
            action={formAction}
            className="max-w-[700px] w-full mx-auto flex flex-col gap-6 px-5"
        >
            <Input
                id="email"
                type="email"
                label="Email"
                placeholder="Email..."
                required
            />
            <PasswordInput
                id="password"
                label="Senha"
                placeholder="Senha..."
                minLength={6}
                required
            />
            <Button text="Entrar" />
        </form>
    );
}
