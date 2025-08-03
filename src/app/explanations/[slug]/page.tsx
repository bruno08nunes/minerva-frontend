import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import { env } from "@/lib/env";
import { Explanation } from "@/types/explanation";
import Link from "next/link";

export default async function ExplanationPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/explanations/list/${slug}`
    );
    const {
        success,
        message,
        data,
    }: {
        success: boolean;
        message: string;
        data: Explanation[];
    } = await res.json();

    return (
        <>
            <Header />
            <main className="p-4">
                <H1 title={"Explicações Sobre " + data[0].topic.name} />
                <section className="max-w-[800px] mx-auto flex flex-col gap-6">
                    {success ? (
                        data.map((item) => (
                            <Link
                                key={item.id}
                                href={`/explanations/${slug}/${item.id}`}
                            >
                                <article className="text-lavender-blush text-xl flex flex-col gap-2 text-justify border-2 border-lavender-blush p-4">
                                    <div className="flex items-baseline gap-2">
                                        <h2 className="font-bold text-2xl">
                                            {item.title}
                                        </h2>
                                        <time dateTime={item.createdAt}>
                                            {new Date(
                                                item.createdAt
                                            ).toLocaleDateString("pt-br")}
                                        </time>
                                    </div>
                                    <p className="line-clamp-3">{item.description}</p>
                                </article>
                            </Link>
                        ))
                    ) : (
                        <p>{message}</p>
                    )}
                </section>
            </main>
        </>
    );
}
