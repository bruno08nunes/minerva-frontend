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
import profilePictureFallback from "../../../../public/no-picture.png";
import type { User } from "@/types/user";
import { editUserAction } from "@/action/edit-user-action";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import type { ProfilePicture } from "@/types/profile-picture";
import { env } from "@/lib/env";
import PasswordInput from "./PasswordInput";

export default function EditUserForm({
    user,
    token,
    profilePictures,
}: {
    user: (User & { email: string }) | null;
    token: string;
    profilePictures: ProfilePicture[];
}) {
    const [state, formAction] = useActionState(editUserAction, {
        success: false,
        message: "",
    });
    const [profilePicture, setProfilePicture] = useState<ProfilePicture | null>(
        null
    );

    useEffect(() => {
        if (state.message && state.success === false) {
            toast.error(state.message, {
                duration: 3000,
                position: "top-center",
                style: { color: "red" },
            });
        }

        if (state.success && state.message) {
            redirect("/users/" + state.message);
        }

        if (state.success) {
            redirect("/");
        }
    }, [state]);

    const currentImage = profilePicture?.url ?? user?.profilePicture?.url;
    const imageUrl = currentImage
        ? `${env.NEXT_PUBLIC_API_URL}/uploads/profile-images/${currentImage}`
        : profilePictureFallback;

    return (
        <form className="flex flex-col gap-4" action={formAction}>
            <div className="flex gap-4 items-center">
                <Image
                    src={imageUrl}
                    width={400}
                    height={400}
                    alt="Sua foto de perfil atual"
                    className="w-35 bg-plum rounded-full"
                />
                <Dialog>
                    <DialogTrigger className="border-2 border-lavender-blush text-lavender-blush p-3 cursor-pointer hover:scale-110 transition">
                        Mudar Foto de Perfil
                    </DialogTrigger>
                    <DialogContent className="bg-plum text-lavender-blush">
                        <DialogTitle className="text-center font-bold text-2xl mb-3">
                            Escolha Sua Foto de Perfil
                        </DialogTitle>
                        <section className="flex flex-wrap justify-center gap-4">
                            {profilePictures.map((item) => (
                                // TODO: Add profile picture description
                                <button
                                    key={item.id}
                                    className="max-w-[100px] w-full cursor-pointer"
                                    onClick={() => {
                                        setProfilePicture({
                                            id: item.id,
                                            url: item.url,
                                        });
                                    }}
                                >
                                    <Image
                                        src={`${env.NEXT_PUBLIC_API_URL}/uploads/profile-images/${item.url}`}
                                        alt={item.description ?? ""}
                                        width={400}
                                        height={400}
                                        className="w-full aspect-square"
                                    />
                                </button>
                            ))}
                        </section>
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
            <div className="grid-cols-2 grid gap-4 sm:flex-row">
                <Input
                    type="email"
                    id="email"
                    label="Email:"
                    placeholder="Email..."
                    defaultValue={user?.email}
                />
                <PasswordInput
                    id="password"
                    label="Senha:"
                    placeholder="Senha..."
                    min={6}
                />
            </div>
            <input type="hidden" name="token" value={token} />
            <input
                type="hidden"
                name="profilePictureId"
                value={profilePicture?.id ?? ""}
            />
            <div className="mt-4 ml-auto mb-4">
                <Button text="Editar Usuário" />
            </div>
        </form>
    );
}
