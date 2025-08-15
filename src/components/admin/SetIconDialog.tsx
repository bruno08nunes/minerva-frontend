"use client";

import Image from "next/image";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Icon } from "@/types/icon";
import { env } from "@/lib/env";
import placeholder from "../../../public/no-picture.png";

export default function SetIconDialog({
    icons,
    currentIcon,
    setCurrentIcon,
}: {
    icons: Icon[];
    currentIcon?: Icon;
    setCurrentIcon: (icon: Icon) => void;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const pathImage = currentIcon?.url
        ? `${env.NEXT_PUBLIC_API_URL}/uploads/icons/${currentIcon.url}`
        : placeholder;

    return (
        <div className="flex gap-4 items-center">
            <Image
                src={pathImage}
                width={400}
                height={400}
                alt="Sua foto de perfil atual"
                className="w-35 bg-plum rounded-full"
            />
            <Dialog
                open={isModalOpen}
                onOpenChange={() => setIsModalOpen((state) => !state)}
            >
                <DialogTrigger className="border-2 border-lavender-blush text-lavender-blush p-3 cursor-pointer hover:scale-110 transition">
                    Mudar Foto de Perfil
                </DialogTrigger>
                <DialogContent className="bg-plum text-lavender-blush">
                    <DialogTitle className="text-center font-bold text-2xl mb-3">
                        Escolha Sua Foto de Perfil
                    </DialogTitle>
                    <section className="flex flex-wrap justify-center gap-4 overflow-auto max-h-[50vh]">
                        {icons.map((item) => (
                            // TODO: Add icon description
                            <button
                                key={item.id}
                                type="button"
                                className="max-w-[100px] w-full cursor-pointer"
                                onClick={() => {
                                    setCurrentIcon({
                                        id: item.id,
                                        url: item.url,
                                    });
                                    setIsModalOpen(false);
                                }}
                            >
                                <Image
                                    src={`${env.NEXT_PUBLIC_API_URL}/uploads/icons/${item.url}`}
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
    );
}
