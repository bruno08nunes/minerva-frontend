import ExplanationLink from "@/components/layout/explanations/ExplanationLink";
import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import { listExplanationsByTopicSlug } from "@/lib/api/explanations";

export default async function ExplanationsListPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const { success, data, message } = await listExplanationsByTopicSlug({
        slug,
    });

    const title =
        typeof data === "object" && data.length > 0
            ? "Explicações Sobre " + data[0]?.topic.name
            : "Não há explicações sobre esse tema.";

    return (
        <>
            <Header />
            <main className="p-4">
                <H1 title={title} />
                <section className="max-w-[800px] mx-auto flex flex-col gap-6 py-4">
                    {success ? (
                        data!.map((item) => (
                            <ExplanationLink key={item.id} explanation={item} />
                        ))
                    ) : (
                        <p>{message}</p>
                    )}
                </section>
            </main>
        </>
    );
}
