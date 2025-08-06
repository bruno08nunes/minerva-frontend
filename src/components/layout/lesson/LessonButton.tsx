"use client";

import { env } from "@/lib/env";
import { getLastCompletedLesson } from "@/lib/indexeddb/progress-idb";
import type { Lesson } from "@/types/lesson";
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@radix-ui/react-hover-card";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const positions = [0, -40, -80, -40, 0, 40, 80, 40];

type LessonsStatus = { status: "unavailable" | "normal" | "completed" }[];
type LessonsStatusState = [
    LessonsStatus,
    Dispatch<SetStateAction<LessonsStatus>>
];

export default function LessonButton({
    item,
    lessonsData,
    index,
}: {
    item: Lesson;
    lessonsData?: Lesson[];
    index: number;
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

                        const isPreviousLessonCompleted =
                            checkIsLessonCompleted(lessonsData?.at(index - 1));

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

            const newLessons: LessonsStatus = lessonsData.map(
                (lesson) => {
                    if (orderLessons < lesson.order - 1) {
                        return { status: "completed" };
                    }
                    if (orderLessons > lesson.order - 1) {
                        return { status: "unavailable" };
                    }
                    return { status: "normal" };
                }
            );
            setLessons(newLessons);
        };
        getLessonsProgress();
    }, [lessonsData]);

    const checkIsLessonCompleted = (lesson?: Lesson) => {
        if (!lesson) {
            return false;
        }

        if (lesson.Progress) {
            return lesson.Progress[0]?.isCompleted;
        }

        return false;
    };

    const getHoverTriggerClasses = (index: number) => {
        const { status } = lessons[index];
        return {
            unavailable: "grayscale-100 pointer-events-none",
            normal: "",
            completed: "grayscale-100 pointer-events-none",
        }[status];
    };

    return (
        <HoverCard>
            <HoverCardTrigger
                href={`/learn/lesson/${item.id}`}
                // TODO: Change the style when lesson is completed
                className={`flex flex-col gap-2 sm:flex-grow-0 flex-grow items-center relative ${getHoverTriggerClasses(
                    index
                )}`}
                style={{
                    left: positions[index % positions.length],
                }}
            >
                <Image
                    src={`${env.NEXT_PUBLIC_API_URL}/uploads/icons/${item.icon.url}`}
                    alt=""
                    width={400}
                    height={400}
                    className="bg-plum max-w-[60px] rounded-full"
                />
                <p className="sm:hidden text-lavender-blush">{item.name}</p>
            </HoverCardTrigger>
            <HoverCardContent
                className="bg-plum text-lavender-blush border-lavender-blush rounded p-2 z-10"
                sideOffset={15}
            >
                <h3 className="text-lg font-bold text-center">{item.name}</h3>
                <p>{item.description}</p>
            </HoverCardContent>
        </HoverCard>
    );
}
