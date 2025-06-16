"use client";
import { Exercise } from "@/types/exercise";
import { Lesson } from "@/types/lesson";
import { Fragment, useState } from "react";

function ExerciseParagraph({ content }: { content: string }) {
    return (
        <p className="text-lavender-blush text-center text-xl max-w-[800px] mx-auto mb-6">
            {content}
        </p>
    );
}

function ExerciseCode({ content }: { content: string }) {
    const codes = content === "_____" ? [] : content.split("_____");
    // TODO: Change the color from input and from <pre> border
    return (
        <pre className="max-w-[800px] bg-plum rounded mx-auto mb-6 border-t-24 border-black p-4">
            {codes.length !== 0 ? (
                codes.map((item, index) => (
                    <Fragment key={index}>
                        <code>{item}</code>
                        <input type="text" />
                    </Fragment>
                ))
            ) : (
                <input
                    type="text"
                    className="border-0 outline-0 bg-black text-lavender-blush p-2"
                />
            )}
        </pre>
    );
}

export default function ExerciseComponent({ lesson }: { lesson: Lesson }) {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const exercise: Exercise = lesson.exercises[currentExerciseIndex];
    console.log(exercise);

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
        </div>
    );
}
