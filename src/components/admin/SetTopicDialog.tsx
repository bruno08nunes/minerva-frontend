"use client";

import { env } from "@/lib/env";
import { Topic } from "@/types/topic";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";

export default function SetTopicDialog({
    topics,
    currentTopic,
    setCurrentTopic,
}: {
    topics: Topic[];
    currentTopic?: Topic;
    setCurrentTopic: (topic: Topic) => void;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const pathImage = currentTopic?.icon.url
        ? `${env.NEXT_PUBLIC_API_URL}/uploads/icons/${currentTopic?.icon.url}`
        : "";

    return (
        <div className="flex gap-4 items-center">
            {pathImage ? (
                <div className="flex gap-4 flex-col">
                    <Image
                        src={pathImage}
                        width={400}
                        height={400}
                        alt="Sua foto de perfil atual"
                        className="w-35 bg-plum rounded-full"
                        title={currentTopic?.name}
                    />
                    <span className="text-lavender-blush text-center text-xl">{currentTopic?.name}</span>
                </div>
            ) : (
                <div className="w-35 bg-plum rounded-full aspect-square"></div>
            )}
            <Dialog
                open={isModalOpen}
                onOpenChange={() => setIsModalOpen((state) => !state)}
            >
                <DialogTrigger className="border-2 border-lavender-blush text-lavender-blush p-3 cursor-pointer hover:scale-110 transition">
                    Selecionar Tópico
                </DialogTrigger>
                <DialogContent className="bg-plum text-lavender-blush">
                    <DialogTitle className="text-center font-bold text-2xl mb-3">
                        Escolha o Tópico
                    </DialogTitle>
                    <section className="flex flex-wrap justify-center gap-4 overflow-auto max-h-[50vh]">
                        {topics.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                className="max-w-[100px] w-full cursor-pointer"
                                title={item.name}
                                onClick={() => {
                                    setCurrentTopic({
                                        id: item.id,
                                        name: item.name,
                                        description: item.description,
                                        icon: item.icon,
                                        order: item.order,
                                        slug: item.slug,
                                    });
                                    setIsModalOpen(false);
                                }}
                            >
                                <Image
                                    src={`${env.NEXT_PUBLIC_API_URL}/uploads/icons/${item.icon.url}`}
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
