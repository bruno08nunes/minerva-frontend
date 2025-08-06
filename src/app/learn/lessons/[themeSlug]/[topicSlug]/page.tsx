import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import LessonButton from "@/components/layout/lesson/LessonButton";
import { listLessonsByTopicAndTheme } from "@/lib/api/lessons";
import { getThemeBySlug } from "@/lib/api/themes";
import { getTopicBySlug } from "@/lib/api/topics";
import { cookies } from "next/headers";

interface LessonsPageProps {
    params: Promise<{ themeSlug: string; topicSlug: string }>;
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

    return (
        <>
            <Header />
            <main>
                <H1 title="Lições" />
                <h2 className="text-center text-lavender-blush text-xl font-bold">
                    {themeData.theme?.name} - {topicData.topic?.name}
                </h2>
                <section className="flex flex-col gap-3 p-4 items-center">
                    {success ? (
                        lessonsData.lessonsData?.map((item, index) => (
                            <LessonButton
                                key={item.id}
                                index={index}
                                item={item}
                                lessonsData={lessonsData.lessonsData}
                            />
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
