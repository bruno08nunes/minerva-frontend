import ExplanationHeader from "@/components/layout/explanations/ExplanationHeader";
import Header from "@/components/layout/Header";
import { getExplanationById } from "@/lib/api/explanations";
import { codeFont } from "@/lib/fonts";
import { notFound } from "next/navigation";
import { Fragment } from "react";

export default async function ExplanationPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const { success, data } = await getExplanationById({ id });

    if (!success || data === undefined) {
        notFound();
    }

    return (
        <>
            <Header />
            <main className="p-4 text-lavender-blush text-xl max-w-[800px] mx-auto text-justify">
                <article>
                    <ExplanationHeader explanation={data} />
                    <section className="py-4 flex flex-col gap-4">
                        {data.content.map((item, index) => (
                            <Fragment key={index}>
                                {item.type === "paragraph" ? (
                                    <p>{item.data}</p>
                                ) : (
                                    <pre
                                        className={`w-full bg-[#ffffff03] rounded mx-auto mb-6 border-6 border-t-24 border-plum p-6 text-xl tracking-wider text-lavender-blush ${codeFont.className}`}
                                    >
                                        <code>{item.data}</code>
                                    </pre>
                                )}
                            </Fragment>
                        ))}
                    </section>
                </article>
            </main>
        </>
    );
}
