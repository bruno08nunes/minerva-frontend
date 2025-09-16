"use client";

import { Lesson } from "@/types/lesson";
import { useState } from "react";

export default function ExercisesAdmin({ lesson }: { lesson: Lesson }) {
    const [exercises, setExercises] = useState(lesson.exercises);

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
        <div className="flex flex-col gap-3">
            {exercises.map((exercise, index) => (
                <div
                    className="text-lavender-blush bg-plum p-4 rounded-md flex gap-3 items-center text-xl"
                    key={exercise.order}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)} // Iniciar o arraste
                    onDragOver={handleDragOver} // Permitir o drop
                    onDrop={(e) => handleDrop(e, index)} // Processar o drop
                >
                    <span>{exercise.order}°</span>
                    <p className="line-clamp-2">{exercise.content[0].data}</p>
                </div>
            ))}
        </div>
    );
}
