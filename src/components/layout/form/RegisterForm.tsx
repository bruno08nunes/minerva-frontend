"use client";

import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import Button from "./Button";
import Input from "./Input";
import { registerAction } from "@/action/register-action";
import PasswordInput from "./PasswordInput";
import { checkIfHasProgressIDB } from "@/lib/indexeddb/progress-idb";

export default function RegisterForm() {
    const [state, formAction] = useActionState(registerAction, {
        success: false,
        message: null,
    });

    useEffect(() => {
        if (state.message && state.success === false) {
            toast.error(state.message, {
                duration: 3000,
                position: "top-center",
                style: { color: "red" },
            });
        }

        if (state.success) {
            redirect("/");
        }
    }, [state]);

    useEffect(() => {
        const checkProgress = async () => {
            const hasProgressIDB = await checkIfHasProgressIDB();
            if (hasProgressIDB) {
                toast.warning(
                    "Você contém dados salvos localmente. Fazer login poderá sobreescrevê-los!",
                    {
                        position: "top-center",
                    }
                );
            }
        };
        checkProgress();

        return () => {
            toast.dismiss();
        }
    }, []);

    return (
        <form
            className="max-w-[700px] w-full mx-auto flex flex-col gap-6 px-5"
            action={formAction}
        >
            <div className="flex gap-4 flex-col sm:flex-row">
                <Input
                    id="name"
                    type="text"
                    label="Nome:"
                    placeholder="Nome..."
                />
                <Input
                    id="username"
                    type="text"
                    label="Nome de Usuário:"
                    placeholder="@Nome de usuário..."
                />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:flex-row">
                <Input
                    id="email"
                    type="email"
                    label="Email:"
                    placeholder="Email..."
                />
                <PasswordInput
                    id="password"
                    label="Senha:"
                    placeholder="Senha..."
                />
            </div>
            <Button text="Cadastrar-se" />
        </form>
    );
}
