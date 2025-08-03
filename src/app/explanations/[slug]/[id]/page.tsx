import Header from "@/components/layout/Header";
import { env } from "@/lib/env";
import { codeFont } from "@/lib/fonts";
import { Explanation } from "@/types/explanation";
import { Clock, EditIcon, FlagIcon } from "lucide-react";
import { Fragment } from "react";

export default async function ExplanationPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/explanations/${id}`);
    const result: { data: Explanation } = await res.json();
    console.log(result);

    const createdAt = new Date(result.data.createdAt).toLocaleDateString(
        "pt-br"
    );
    const updatedAt = new Date(result.data.updatedAt).toLocaleDateString(
        "pt-br"
    );

    return (
        <>
            <Header />
            <main className="p-4 text-lavender-blush text-xl max-w-[800px] mx-auto text-justify">
                <article>
                    <header className="flex flex-col gap-3">
                        <h1 className="text-4xl text-cente">
                            {result.data.title}
                        </h1>
                        <div className="flex gap-4">
                            <div className="flex gap-1 items-center">
                                <Clock color="#D3B1C2" />
                                <time dateTime={result.data.createdAt}>
                                    {createdAt}
                                </time>
                            </div>
                            {updatedAt !== createdAt && (
                                <div className="flex gap-1 items-center">
                                    <EditIcon color="#D3B1C2" />
                                    <time dateTime={result.data.updatedAt}>
                                        {updatedAt}
                                    </time>
                                </div>
                            )}
                        </div>
                            <span className="border border-current py-1 px-2 rounded-lg text-lg flex gap-1 items-center self-start">
                                <FlagIcon size={20} />
                                {result.data.topic.name}
                            </span>
                    </header>
                    <section className="py-4 flex flex-col gap-4">
                        {result.data.content.map((item, index) => (
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
