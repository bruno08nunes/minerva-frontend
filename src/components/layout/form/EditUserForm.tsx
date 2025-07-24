"use client";

import Image from "next/image";
import Button from "./Button";
import Input from "./Input";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import placeholderProfilePicture from "../../../../public/pc.png";
import type { User } from "@/types/user";
import { editUserAction } from "@/action/edit-user-action";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function EditUserForm({
    user,
}: {
    user: (User & { email: string }) | null;
}) {
    const [state, formAction] = useActionState(editUserAction, {
        success: false,
        message: "",
    });

    useEffect(() => {
        if (state.message && state.success === false) {
            toast.error(state.message, {
                duration: 3000,
                position: "top-center",
                style: { color: "red" } 
            });
        }

        if (state.success && state.message) {
            redirect("/users/" + state.message);
        }
        
        if (state.success) {
            redirect("/");
        }
    }, [state]);

    return (
        <form className="flex flex-col gap-4" action={formAction}>
            <div className="flex gap-4 items-center">
                <Image
                    src={placeholderProfilePicture}
                    alt="Sua foto de perfil atual"
                    className="w-35 bg-plum rounded-full"
                />
                <Dialog>
                    <DialogTrigger className="border-2 border-lavender-blush text-lavender-blush p-3 cursor-pointer hover:scale-110 transition">
                        Mudar Foto de Perfil
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Escolha Sua Foto de Perfil</DialogTitle>
                        {/* TODO: List profile pictures */}
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex gap-4 flex-col sm:flex-row">
                <Input
                    id="name"
                    label="Nome:"
                    placeholder="Nome..."
                    defaultValue={user?.name}
                />
                <Input
                    id="username"
                    label="Nome de Usuário:"
                    placeholder="@Nome de usuário..."
                    defaultValue={user?.username}
                />
            </div>
            <div className="flex gap-4 flex-col sm:flex-row">
                <Input
                    type="email"
                    id="email"
                    label="Email:"
                    placeholder="Email..."
                    defaultValue={user?.email}
                />
                <Input
                    type="password"
                    id="password"
                    label="Senha:"
                    placeholder="Senha..."
                />
            </div>
            <div className="mt-4 ml-auto mb-4">
                <Button text="Editar Usuário" />
            </div>
        </form>
    );
}
