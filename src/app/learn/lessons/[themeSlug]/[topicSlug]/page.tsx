import Header from "@/components/layout/Header";
import { env } from "@/lib/env";

interface LessonsPageProps {
    params: Promise<{ themeSlug: string; topicSlug: string }>;
}

interface LessonsListResponse {
    success: boolean;
    message: string;
    data: Record<string, string>[];
}

export default async function LessonsPage({ params }: LessonsPageProps) {
    const { themeSlug, topicSlug } = await params;

    const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/lessons/list?themeSlug=${themeSlug}&topicSlug=${topicSlug}`
    );
    const { data, success, message }: LessonsListResponse =
        await response.json();

    return (
        <>
            <Header />
            <section>
                {success ? (
                    data.map((item, index) => (
                        <div key={item?.id || index}>{item?.name}</div>
                    ))
                ) : (
                    <p>{message}</p>
                )}
            </section>
        </>
    );
}
