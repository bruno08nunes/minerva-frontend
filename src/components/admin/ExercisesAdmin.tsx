"use client";

import { env } from "@/lib/env";
import { Lesson } from "@/types/lesson";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";

export default function ExercisesAdmin({ lesson, token }: { lesson: Lesson, token: string }) {
    const [exercises, setExercises] = useState(lesson.exercises);
    
    const handleEditExercisesOrder = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = exercises.map((exercise, i) => ({ id: exercise.id, order: i + 1 }));
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/exercises/order`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        
        if (res.ok) {
            redirect("/admin/lessons");
        }
        
        alert("Erro");
        const result = await res.json();
        console.error(result);
    }

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

        const reorderedExercises = [...exercises];
        const [removed] = reorderedExercises.splice(draggedIndex, 1);
        reorderedExercises.splice(targetIndex, 0, removed);

        setExercises(reorderedExercises); // Atualizar o estado com a nova ordem
    };

    return (
        <form className="flex flex-col gap-3" onSubmit={handleEditExercisesOrder}>
            {exercises.map((exercise, index) => (
                <Link
                    href={"/admin/exercise/" + exercise.id}
                    className="text-lavender-blush bg-plum p-4 rounded-md flex gap-3 items-center text-xl"
                    key={exercise.order}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)} // Iniciar o arraste
                    onDragOver={handleDragOver} // Permitir o drop
                    onDrop={(e) => handleDrop(e, index)} // Processar o drop
                >
                    <span>{exercise.order}°</span>
                    <p className="line-clamp-2">{exercise.content[0].data}</p>
                </Link>
            ))}
            <div className="flex gap-4 justify-end m-3">
                <Link href={`/admin/exercises/${lesson.id}/create`} className="text-lavender-blush bg-plum p-2 rounded-md gap-3">Criar Novo Exercício</Link>
                <button type="submit" className="text-lavender-blush bg-plum p-2 rounded-md gap-3 cursor-pointer">Alterar Ordem</button>
            </div>
        </form>
    );
}
