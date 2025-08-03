import { Explanation } from "@/types/explanation";
import Link from "next/link";

export default function ExplanationLink({
    explanation,
}: {
    explanation: Explanation;
}) {
    return (
        <Link
            href={`/explanations/${explanation.topic.slug}/${explanation.id}`}
        >
            <article className="text-lavender-blush text-xl flex flex-col gap-2 text-justify border-2 border-lavender-blush p-4 hover:-translate-y-3 hover:border-plum transition-transform">
                <div className="flex items-baseline gap-2">
                    <h2 className="font-bold text-2xl">{explanation.title}</h2>
                    <time dateTime={explanation.createdAt}>
                        {new Date(explanation.createdAt).toLocaleDateString(
                            "pt-br"
                        )}
                    </time>
                </div>
                <p className="line-clamp-3">{explanation.description}</p>
            </article>
        </Link>
    );
}
