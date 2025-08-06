import { env } from "@/lib/env";
import type { Lesson } from "@/types/lesson";
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@radix-ui/react-hover-card";
import Image from "next/image";

const positions = [0, -40, -80, -40, 0, 40, 80, 40];

export default function LessonButton({
    item,
    status,
}: {
    item: Lesson;
    status: "unavailable" | "normal" | "completed";
}) {
    const classes = {
        unavailable: "grayscale-100 pointer-events-none",
        normal: "",
        completed: "grayscale-100 pointer-events-none",
    }[status];

    return (
        <HoverCard>
            <HoverCardTrigger
                href={`/learn/lesson/${item.id}`}
                // TODO: Change the style when lesson is completed
                className={`flex flex-col gap-2 sm:flex-grow-0 flex-grow items-center relative ${classes}`}
                style={{
                    left: positions[(item.order - 1) % positions.length],
                }}
            >
                <Image
                    src={`${env.NEXT_PUBLIC_API_URL}/uploads/icons/${item.icon.url}`}
                    alt=""
                    width={400}
                    height={400}
                    className="bg-plum max-w-[60px] rounded-full"
                />
                <p className="text-lavender-blush">{item.name}</p>
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
