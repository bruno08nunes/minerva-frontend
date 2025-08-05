"use client";
import { Exercise } from "@/types/exercise";
import { Lesson } from "@/types/lesson";
import { useState } from "react";
import ExerciseParagraph from "./ExerciseParagraph";
import ExerciseCode from "./ExerciseCode";
import Link from "next/link";
import Image from "next/image";

import winImage from "../../../public/pc.png";
import { winLesson } from "@/lib/api/lessons";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { updateLessonProgress } from "@/lib/indexeddb/progress-idb";
import { toast } from "sonner";
import { refreshToken } from "@/lib/api/user";

export default function ExerciseComponent({
    lesson,
    token,
}: {
    lesson: Lesson;
    token?: string;
}) {
    const [inputValue, setInputValue] = useState("");
    const [isGameOver, setIsGameOver] = useState(false);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const exercise: Exercise = lesson.exercises[currentExerciseIndex];

    async function updateExercise() {
        if (currentExerciseIndex + 1 >= 2) {
            setIsGameOver(true);
            if (!token) {
                const newToken = (await refreshToken()) ?? token;
                token = newToken;
                if (!token) {
                    const [err] = await updateLessonProgress({
                        themeId: lesson.themeId,
                        topicId: lesson.topicId,
                    });
                    if (err) {
                        toast.error("Erro ao salvar dados localmente.", {
                            duration: 3000,
                            position: "top-center",
                            style: { color: "red" },
                        });
                    }
                    return;
                }
            }
            await winLesson({ token, lesson });
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
            <div className="flex justify-center mx-auto max-w-[800px] gap-6 py-8">
                <Image src={winImage} alt="" />
                <div className="text-lavender-blush py-8 flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-bold text-center mb-5">
                        Vitória!
                    </h2>
                    <p className="text-xl">
                        Parabéns! Você concluiu essa lição!
                    </p>
                    <Link
                        href={`/learn/lessons/${lesson.theme.slug}/${lesson.topic.slug}`}
                        className="inline-block mt-8 p-4 bg-plum rounded-xl"
                    >
                        Continuar
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Exercise Hint Button */}
            <Dialog>
                <DialogTrigger className="bg-plum text-lavender-blush px-5 py-3 rounded-full text-xl cursor-pointer absolute right-0 top-0">
                    Dica
                </DialogTrigger>
                <DialogContent className="bg-plum text-lavender-blush">
                    <DialogTitle className="font-bold text-2xl">
                        Dica
                    </DialogTitle>
                    <DialogDescription className="text-lavender-blush text-lg">
                        {exercise.hint}
                    </DialogDescription>
                </DialogContent>
            </Dialog>

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
        </>
    );
}
