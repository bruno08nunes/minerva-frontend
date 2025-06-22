"use client";
import { Exercise } from "@/types/exercise";
import { Lesson } from "@/types/lesson";
import { useState } from "react";
import ExerciseParagraph from "./ExerciseParagraph";
import ExerciseCode from "./ExerciseCode";
import { useRouter } from "next/navigation";

export default function ExerciseComponent({ lesson }: { lesson: Lesson }) {
    const [inputValue, setInputValue] = useState("");
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const exercise: Exercise =
        lesson.exercises[currentExerciseIndex % lesson.exercises.length];

    const router = useRouter();

    function updateExercise() {
        if (currentExerciseIndex + 1 >= lesson.exercises.length) {
            router.push(`/learn/lessons/${lesson.theme.slug}/${lesson.topic.slug}`);
        }
        setCurrentExerciseIndex((state) => state + 1);
    }

    function handleSubmitChoice(isCorrect: boolean) {
        alert(isCorrect ? "Correto" : "Errado");
        if (isCorrect) {
            updateExercise();
        }
    }
    
    function handleChangeInput(value: string) {
        setInputValue(value);
    }
    
    function handleSubmitInputAnswer() {
        const isCorrect = inputValue === exercise.choices[0].text;
        alert(isCorrect ? "Correto" : "Errado");
        setInputValue("");
        if (isCorrect) {
            updateExercise();
        }
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
