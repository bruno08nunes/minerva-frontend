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
import { Metadata } from "next";
import { PreviousLink } from "@/components/layout/PreviousLink";

interface ChallengesPagesProps {
    params: Promise<{ themeSlug: string }>;
}

export const metadata: Metadata = {
    title: "Tópicos | Minerva",
    description:
        "Escolha o tópico de lógica e programação que você deseja aumentar seu conhecimento.",
    openGraph: {
        title: "Tópicos | Minerva",
        description:
            "Escolha o tópico de lógica e programação que você deseja aumentar seu conhecimento.",
        type: "website",
    },
    twitter: {
        title: "Tópicos | Minerva",
        description:
            "Escolha o tópico de lógica e programação que você deseja aumentar seu conhecimento.",
    },
};

export default async function ChallengesPages({
    params,
}: ChallengesPagesProps) {
    const { themeSlug } = await params;

    const { success, message, topicsData } = await listTopics();
    const { theme, success: themeSuccess } = await getThemeBySlug(themeSlug);

    if (!themeSuccess) {
        redirect("/learn/themes");
    }

    const previousPage = "/learn/themes";

    return (
        <>
            <Header />
            <div className="flex items-center justify-between px-2">
                <PreviousLink url={previousPage} />
                <H1 title="Desafios" />
                <span className="flex-1"></span>
            </div>
            <main className="max-w-[800px] w-full mx-auto px-8 pb-4">
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
                                        <p className="text-lavender-blush">
                                            {item.name}
                                        </p>
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
