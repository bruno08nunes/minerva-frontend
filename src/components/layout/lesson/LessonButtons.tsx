"use client";

import { Lesson } from "@/types/lesson";
import LessonButton from "./LessonButton";
import { getLastCompletedLesson } from "@/lib/indexeddb/progress-idb";
import { Dispatch, SetStateAction, useState, useEffect } from "react";

type LessonsStatus = { status: "unavailable" | "normal" | "completed" }[];
type LessonsStatusState = [
    LessonsStatus,
    Dispatch<SetStateAction<LessonsStatus>>
];

export default function LessonButtons({
    lessonsData,
}: {
    lessonsData?: Lesson[];
}) {
    const [lessons, setLessons]: LessonsStatusState = useState(
        Array(lessonsData?.length ?? 0).fill({ status: "unavailable" })
    );

    useEffect(() => {
        const getLessonsProgress = async () => {
            if (!lessonsData) {
                return;
            }

            if (lessonsData[0].Progress) {
                const newLessons: LessonsStatus =
                    lessonsData.map((lesson, index) => {
                        const isCompleted = checkIsLessonCompleted(lesson);
                        if (isCompleted) {
                            return { status: "completed" };
                        }

                        const previousLesson = lessonsData?.[index - 1];
                        const isPreviousLessonCompleted =
                            checkIsLessonCompleted(previousLesson);

                        if (isPreviousLessonCompleted) {
                            return { status: "normal" };
                        }

                        return { status: "unavailable" };
                    }) ?? [];
                setLessons(newLessons);
                return;
            }

            const orderLessons = await getLastCompletedLesson({
                themeId: lessonsData[0].themeId,
                topicId: lessonsData[0].topicId,
            });

            const newLessons: LessonsStatus = lessonsData.map((lesson) => {
                if (orderLessons < lesson.order - 1) {
                    return { status: "completed" };
                }
                if (orderLessons > lesson.order - 1) {
                    return { status: "unavailable" };
                }
                return { status: "normal" };
            });
            setLessons(newLessons);
        };
        getLessonsProgress();
    }, [lessonsData]);

    const checkIsLessonCompleted = (lesson?: Lesson) => {
        if (!lesson) {
            return true;
        }

        if (lesson.Progress) {
            return lesson.Progress[0]?.isCompleted ?? false;
        }

        return false;
    };

    return lessonsData?.map((item, index) => (
        <LessonButton
            key={item.id}
            item={item}
            status={lessons[index].status}
        />
    ));
}
