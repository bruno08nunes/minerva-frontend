import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import { listLessonsByTopicAndTheme } from "@/lib/api/lessons";
import { env } from "@/lib/env";
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@radix-ui/react-hover-card";
import Image from "next/image";

interface LessonsPageProps {
    params: Promise<{ themeSlug: string; topicSlug: string }>;
}

export default async function LessonsPage({ params }: LessonsPageProps) {
    const { themeSlug, topicSlug } = await params;

    const topicAndThemeResponses = await Promise.all([
        fetch(`${env.NEXT_PUBLIC_API_URL}/themes/${themeSlug}`),
        fetch(`${env.NEXT_PUBLIC_API_URL}/topics/${topicSlug}`),
    ]);
    const [themeData, topicData] = await Promise.all(
        topicAndThemeResponses.map((response) => response.json())
    );

    const { lessonsData, message, success } = await listLessonsByTopicAndTheme({ themeId: themeData.data.id, topicId: topicData.data.id });

    const positions = [0, -40, -80, -40, 0, 40, 80, 40];

    return (
        <>
            <Header />
            <main>
                <H1 title="Lições" />
                <h2 className="text-center text-lavender-blush text-xl font-bold">
                    {themeData.data.name} - {topicData.data.name}
                </h2>
                <section className="flex flex-col gap-3 p-4 items-center">
                    {success ? (
                        lessonsData!.map((item, index) => (
                            <HoverCard key={item.id}>
                                <HoverCardTrigger
                                    href={`/learn/lesson/${item.id}`}
                                    className="flex flex-col gap-2 sm:flex-grow-0 flex-grow items-center relative"
                                    style={{ left: positions[index % positions.length] }}
                                >
                                    <Image
                                        src={`${env.NEXT_PUBLIC_API_URL}/uploads/icons/${item.icon.url}`}
                                        alt=""
                                        width={400}
                                        height={400}
                                        className="bg-plum max-w-[60px] rounded-full"
                                    />
                                    <p className="sm:hidden text-lavender-blush">
                                        {item.name}
                                    </p>
                                </HoverCardTrigger>
                                <HoverCardContent
                                    className="bg-plum text-lavender-blush border-lavender-blush rounded p-2 z-10"
                                    sideOffset={15}
                                >
                                    <h3 className="text-lg font-bold text-center">
                                        {item.name}
                                    </h3>
                                    <p>{item.description}</p>
                                </HoverCardContent>
                            </HoverCard>
                        ))
                    ) : (
                        <p className="p-5 text-xl text-lavender-blush">
                            Erro: {message}
                        </p>
                    )}
                </section>
            </main>
        </>
    );
}
