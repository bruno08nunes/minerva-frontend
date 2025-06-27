"use client";
import { Exercise } from "@/types/exercise";
import { Lesson } from "@/types/lesson";
import { useState } from "react";
import ExerciseParagraph from "./ExerciseParagraph";
import ExerciseCode from "./ExerciseCode";
import Link from "next/link";
import Image from "next/image";

import winImage from "../../../public/pc.png";
import { env } from "@/lib/env";

export default function ExerciseComponent({ lesson, token }: { lesson: Lesson, token?: string }) {
    const [inputValue, setInputValue] = useState("");
    const [isGameOver, setIsGameOver] = useState(false);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const exercise: Exercise = lesson.exercises[currentExerciseIndex];

    async function updateExercise() {
        if (currentExerciseIndex + 1 >= lesson.exercises.length) {
            setIsGameOver(true);
            if (!token) {
                // TODO: Add a way to save the user data in localStorage
                return;
            }
            await fetch(`${env.NEXT_PUBLIC_API_URL}/progress`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    lessonId: lesson.id,
                    isCompleted: true
                })
            });
            await fetch(`${env.NEXT_PUBLIC_API_URL}/users/streak`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            return;
        }
        setCurrentExerciseIndex((state) => state + 1);
    }

    function handleSubmitChoice(isCorrect: boolean) {
        if (isCorrect) {
            updateExercise();
        }
    }

    function handleChangeInput(value: string) {
        setInputValue(value);
    }

    function handleSubmitInputAnswer() {
        const isCorrect = inputValue === exercise.choices[0].text;
        setInputValue("");
        if (isCorrect) {
            updateExercise();
        }
    }

    if (isGameOver) {
        return (
            <section className="flex justify-center mx-auto max-w-[800px] gap-6 py-8">
                <Image src={winImage} alt="" />
                <div className="text-lavender-blush py-8 flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-bold text-center mb-5">Vitória!</h2>
                    <p className="text-xl">Parabéns! Você concluiu essa lição!</p>
                    <Link
                        href={`/learn/lessons/${lesson.theme.slug}/${lesson.topic.slug}`}
                        className="inline-block mt-8 p-4 bg-plum rounded-xl"
                    >
                        Continuar
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section>
            {/* Exercise Content */}
            {exercise.content.map((item, index) => (
                <div key={index}>
                    {item.type === "paragraph" ? (
                        <ExerciseParagraph content={item.data} />
                    ) : (
                        <ExerciseCode
                            content={item.data}
                            onChangeInputValue={handleChangeInput}
                            inputValue={inputValue}
                        />
                    )}
                </div>
            ))}

            {/* Submit Button for Write Code/Complete Code Exercises */}
            {["WRITE_CODE", "COMPLETE_CODE"].includes(exercise.type) && (
                <button
                    onClick={handleSubmitInputAnswer}
                    className="bg-plum text-lavender-blush p-4 rounded w-full max-w-[200px] text-center font-bold text-xl cursor-pointer mx-auto block"
                >
                    Enviar
                </button>
            )}

            {/* Choices for Multiple Choice Exercises */}
            {exercise.type === "MULTIPLE_CHOICE" && (
                <div className="grid grid-cols-2 items-center justify-items-center max-w-[800px] mx-auto gap-4 max-[500px]:grid-cols-1">
                    {exercise.choices.map((item) => (
                        <button
                            key={item.id}
                            className="bg-plum text-lavender-blush p-4 rounded w-full max-w-[200px] text-center font-bold text-xl cursor-pointer"
                            onClick={() => handleSubmitChoice(item.isCorrect)}
                        >
                            {item.text}
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
}
