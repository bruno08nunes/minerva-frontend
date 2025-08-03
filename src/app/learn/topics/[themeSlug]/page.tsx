import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import { env } from "@/lib/env";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { listTopics } from "@/lib/api/topics";
import { getThemeBySlug } from "@/lib/api/themes";

interface ChallengesPagesProps {
    params: Promise<{ themeSlug: string }>;
}

export default async function ChallengesPages({
    params,
}: ChallengesPagesProps) {
    const { themeSlug } = await params;

    const { success, message, topicsData } = await listTopics();
    const { theme, success: themeSuccess } = await getThemeBySlug(themeSlug);

    if (!themeSuccess) {
        redirect("/learn/themes");
    }

    return (
        <>
            <Header />
            <main className="max-w-[800px] w-full mx-auto px-8 pb-4">
                <H1 title="Desafios" />
                <h2 className="text-lavender-blush text-2xl text-center font-bold pb-6">
                    {theme?.name ?? themeSlug.toUpperCase()}
                </h2>
                <section className="flex gap-8 items-center flex-wrap">
                    {success ? (
                        <>
                            {topicsData!.map((item) => (
                                <HoverCard key={item.id}>
                                    <HoverCardTrigger
                                        href={`/learn/lessons/${themeSlug}/${item.slug}`}
                                        className="flex flex-col gap-2 sm:flex-grow-0 flex-grow items-center"
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
                                        className="bg-plum text-lavender-blush border-lavender-blush"
                                        sideOffset={15}
                                    >
                                        <h3 className="text-lg font-bold text-center">
                                            {item.name}
                                        </h3>
                                        <p>{item.description}</p>
                                    </HoverCardContent>
                                </HoverCard>
                            ))}
                        </>
                    ) : (
                        <p>{message}</p>
                    )}
                </section>
            </main>
        </>
    );
}
