"use client";

import { env } from "@/lib/env";
import { Exercise } from "@/types/exercise";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MouseEvent, useState } from "react";
import Button from "../layout/form/Button";

export default function ChoicesAdmin({
    exercise,
    token,
}: {
    exercise: Exercise;
    token: string;
}) {
    const [choices, setChoices] = useState(exercise.choices);

    const handleEditChoicesOrder = async (e: MouseEvent<HTMLButtonElement>) => {
        const data = choices.map((choice, i) => ({
            id: choice.id,
            order: i + 1,
        }));
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/choices/order`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            redirect("/admin/lessons");
        }

        alert("Erro");
        const result = await res.json();
        console.error(result);
    };

    const handleDragStart = (e: React.DragEvent, index: number) => {
        e.dataTransfer.setData("index", index.toString());
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, targetIndex: number) => {
        e.preventDefault();
        const draggedIndex = parseInt(e.dataTransfer.getData("index"), 10);

        if (draggedIndex === targetIndex) return;

        const reorderedChoices = [...choices];
        const [removed] = reorderedChoices.splice(draggedIndex, 1);
        reorderedChoices.splice(targetIndex, 0, removed);

        setChoices(reorderedChoices);
    };

    return (
        <>
            {choices.map((choice, index) => (
                <Link
                    href={"/admin/choice/" + choice.id}
                    className="text-lavender-blush bg-plum p-4 rounded-md flex gap-3 items-center text-xl"
                    key={choice.order}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                >
                    <span>{choice.order}°</span>
                    <p className="line-clamp-2">{choice.text}</p>
                </Link>
            ))}
            <Button text="Editar Ordem" onClick={handleEditChoicesOrder} />
        </>
    );
}
