"use client";
import { Exercise } from "@/types/exercise";
import { Lesson } from "@/types/lesson";
import { Fragment, useState } from "react";

function ExerciseParagraph({ content }: { content: string }) {
    return <p>{content}</p>;
}

function ExerciseCode({ content }: { content: string }) {
    const codes = content === "_____" ? [] : content.split("_____");
    console.log(codes);
    return (
        <pre>
            {codes.length !== 0 ? (
                codes.map((item, index) => (
                    <Fragment key={index}>
                        <code>{item}</code>
                        <input type="text" />
                    </Fragment>
                ))
            ) : (
                <input type="text" />
            )}
        </pre>
    );
}

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
        </div>
    );
}
