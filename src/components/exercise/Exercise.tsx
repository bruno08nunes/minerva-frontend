"use client";
import { Exercise } from "@/types/exercise";
import { Lesson } from "@/types/lesson";
import { useState } from "react";
import ExerciseParagraph from "./ExerciseParagraph";
import ExerciseCode from "./ExerciseCode";

export default function ExerciseComponent({ lesson }: { lesson: Lesson }) {
    const [inputValue, setInputValue] = useState("");
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const exercise: Exercise = lesson.exercises[currentExerciseIndex];

    function handleSubmitChoice(isCorrect: boolean) {
        alert(isCorrect ? "Correto" : "Errado");
    }

    function handleChangeInput(value: string) {
        setInputValue(value);
    }

    function handleSubmitInputAnswer() {
        alert(inputValue === exercise.choices[0].text ? "Correto" : "Errado");
    }

    return (
        <div>
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
            {["WRITE_CODE", "COMPLETE_CODE"].includes(exercise.type) && (
                <button
                    onClick={handleSubmitInputAnswer}
                    className="bg-plum text-lavender-blush p-4 rounded w-full max-w-[200px] text-center font-bold text-xl cursor-pointer mx-auto block"
                >
                    Enviar
                </button>
            )}
            {exercise.type === "MULTIPLE_CHOICE" && (
                <section className="grid grid-cols-2 items-center justify-items-center max-w-[800px] mx-auto gap-4 max-[500px]:grid-cols-1">
                    {exercise.choices.map((item) => (
                        <button
                            key={item.id}
                            className="bg-plum text-lavender-blush p-4 rounded w-full max-w-[200px] text-center font-bold text-xl cursor-pointer"
                            onClick={() => handleSubmitChoice(item.isCorrect)}
                        >
                            {item.text}
                        </button>
                    ))}
                </section>
            )}
            <button
                className="bg-plum text-lavender-blush absolute bottom-[30%] left-[50%] translate-[0 -50%] p-2 rounded-2xl cursor-pointer"
                onClick={() =>
                    setCurrentExerciseIndex((state) => {
                        if (state + 1 === lesson.exercises.length) {
                            return 0;
                        }
                        return state + 1;
                    })
                }
            >
                Teste
            </button>
        </div>
    );
}
