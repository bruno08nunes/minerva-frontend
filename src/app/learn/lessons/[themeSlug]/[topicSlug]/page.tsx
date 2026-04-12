import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import LessonButtons from "@/components/layout/lesson/LessonButtons";
import { PreviousLink } from "@/components/layout/PreviousLink";
import { listLessonsByTopicAndTheme } from "@/lib/api/lessons";
import { getThemeBySlug } from "@/lib/api/themes";
import { getTopicBySlug } from "@/lib/api/topics";
import { Metadata } from "next";
import { cookies } from "next/headers";

interface LessonsPageProps {
    params: Promise<{ themeSlug: string; topicSlug: string }>;
}

export async function generateMetadata({
    params,
}: LessonsPageProps): Promise<Metadata> {
    const [{ themeSlug, topicSlug }, cookie] = await Promise.all([
        params,
        cookies(),
    ]);

    const token = cookie.get("token");

    const data = await Promise.all([
        listLessonsByTopicAndTheme({
            themeSlug,
            topicSlug,
            token: token?.value,
        }),
        getTopicBySlug(topicSlug),
        getThemeBySlug(themeSlug),
    ]);

    const [, topicData, themeData] = data;

    return {
        title: "Desafios de " + topicData.topic?.name + " | Minerva",
        description:
            "Conclua desafios de " +
            topicData.topic?.name +
            " usando " +
            themeData.theme?.name +
            " como base para o aprendizado.",
        openGraph: {
            title: "Desafios de " + topicData.topic?.name + " | Minerva",
            description:
                "Conclua desafios de " +
                topicData.topic?.name +
                " usando " +
                themeData.theme?.name +
                " como base para o aprendizado.",
            type: "website",
        },
        twitter: {
            title: "Desafios de " + topicData.topic?.name + " | Minerva",
            description:
                "Conclua desafios de " +
                topicData.topic?.name +
                " usando " +
                themeData.theme?.name +
                " como base para o aprendizado.",
        },
    };
}

export default async function LessonsPage({ params }: LessonsPageProps) {
    const [{ themeSlug, topicSlug }, cookie] = await Promise.all([
        params,
        cookies(),
    ]);

    const token = cookie.get("token");

    const data = await Promise.all([
        listLessonsByTopicAndTheme({
            themeSlug,
            topicSlug,
            token: token?.value,
        }),
        getTopicBySlug(topicSlug),
        getThemeBySlug(themeSlug),
    ]);

    const [lessonsData, topicData, themeData] = data;

    const success =
        themeData.success && topicData.success && lessonsData.success;
    const message =
        data.find((item) => !item.success)?.message ?? data[0].message;

    const previousPage = themeData.success ? ("/learn/topics/" + themeData.theme?.slug) : "";

    return (
        <>
            <Header />
            <main>
                <div className="flex items-center justify-between px-2">
                    <PreviousLink url={previousPage} />
                    <H1 title="Lições" />
                    <span className="flex-1"></span>
                </div>
                <h2 className="text-center text-lavender-blush text-xl font-bold">
                    {themeData.theme?.name} - {topicData.topic?.name}
                </h2>
                <section className="flex flex-col gap-3 p-4 items-center">
                    {success ? (
                        <LessonButtons lessonsData={lessonsData.lessonsData} />
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
