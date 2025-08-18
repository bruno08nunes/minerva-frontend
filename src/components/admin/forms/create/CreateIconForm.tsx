"use client";

import { createIconAction } from "@/action/admin/create/create-icon-action";
import Button from "@/components/layout/form/Button";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function CreateIconForm({ token }: { token: string }) {
    const [icon, setIcon] = useState("");

    const [state, formAction] = useActionState(createIconAction, {
        success: false,
        message: "",
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
            redirect("/admin/icons");
        }
    }, [state]);

    const handleChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fr = new FileReader();
        fr.onload = () => {
            setIcon(fr.result as string);
        };
        const fileList = e.target.files;
        if (fileList && fileList) {
            fr.readAsDataURL(fileList[0]);
        }
    };

    return (
        <form
            action={formAction}
            className="flex flex-col gap-4 justify-center"
        >
            <div className="flex gap-4 items-center justify-center">
                {icon ? (
                    <Image
                        src={icon}
                        width={400}
                        height={400}
                        alt="Sua foto de perfil atual"
                        className="w-35 bg-plum rounded-full"
                    />
                ) : (
                    <div className="w-35 bg-plum rounded-full aspect-square" />
                )}
                <label className="border-2 border-lavender-blush text-lavender-blush p-3 cursor-pointer hover:scale-110 transition">
                    Adicionar Ícone
                    <input
                        type="file"
                        name="file"
                        id="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleChangeFileInput}
                    />
                </label>
            </div>
            <input type="hidden" name="token" value={token} />
            <Button text="Criar" />
        </form>
    );
}
