import type { Lesson } from "@/types/lesson";
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@radix-ui/react-hover-card";
import Image from "next/image";

import button from "../../../../public/buttons/button1.png";
// import buttonPressed from "../../../../public/buttons/button1-pressed.png";
import buttonFinished from "../../../../public/buttons/button-finished.png";
import buttonBlocked from "../../../../public/buttons/button-blocked.png";

const positions = [0, -40, -80, -40, 0, 40, 80, 40];

export default function LessonButton({
    item,
    status,
}: {
    item: Lesson;
    status: "unavailable" | "normal" | "completed";
}) {
    const classes = {
        unavailable: "pointer-events-none",
        normal: "",
        completed: "pointer-events-none",
    }[status];

    const image = {
        unavailable: buttonBlocked,
        normal: button,
        completed: buttonFinished,
    }[status];

    return (
        <HoverCard>
            <div className={classes ? "cursor-not-allowed" : ""}>
                <HoverCardTrigger
                    href={`/learn/lesson/${item.id}`}
                    // TODO: Change the style when lesson is completed
                    className={`flex flex-col gap-2 sm:flex-grow-0 flex-grow items-center relative ${classes}`}
                    style={{
                        left: positions[(item.order - 1) % positions.length],
                    }}
                >
                    <Image
                        src={image}
                        alt=""
                        width={400}
                        height={400}
                        className="max-w-[60px] rounded-full drop-shadow-md drop-shadow-lavender-blush"
                    />
                    <p className="text-lavender-blush">{item.name}</p>
                </HoverCardTrigger>
            </div>
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
