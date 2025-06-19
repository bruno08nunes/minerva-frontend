"use client";
import { Exercise } from "@/types/exercise";
import { Lesson } from "@/types/lesson";
import { useState } from "react";
import ExerciseParagraph from "./ExerciseParagraph";
import ExerciseCode from "./ExerciseCode";

export default function ExerciseComponent({ lesson }: { lesson: Lesson }) {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const exercise: Exercise = lesson.exercises[currentExerciseIndex];

    return (
        <div>
            {exercise.content.map((item, index) => (
                <div key={index}>
                    {item.type === "paragraph" ? (
                        <ExerciseParagraph content={item.data} />
                    ) : (
                        <ExerciseCode content={item.data} />
                    )}
                </div>
            ))}
            {exercise.choices.map((item) => (
                <p key={item.id}>{item.text}</p>
            ))}
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
