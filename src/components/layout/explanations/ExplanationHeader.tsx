import { Explanation } from "@/types/explanation";
import { Clock, EditIcon, FlagIcon } from "lucide-react";

export default function ExplanationHeader({
    explanation,
}: {
    explanation: Explanation;
}) {
    const createdAt = new Date(explanation.createdAt).toLocaleDateString(
        "pt-br"
    );
    const updatedAt = new Date(explanation.updatedAt).toLocaleDateString(
        "pt-br"
    );

    return (
        <header className="flex flex-col gap-3">
            <h1 className="text-4xl text-cente">{explanation.title}</h1>
            <div className="flex gap-4">
                <div className="flex gap-1 items-center">
                    <Clock color="#D3B1C2" />
                    <time dateTime={explanation.createdAt}>{createdAt}</time>
                </div>
                {updatedAt !== createdAt && (
                    <div className="flex gap-1 items-center">
                        <EditIcon color="#D3B1C2" />
                        <time dateTime={explanation.updatedAt}>
                            {updatedAt}
                        </time>
                    </div>
                )}
            </div>
            <span className="border border-current py-1 px-2 rounded-lg text-lg flex gap-1 items-center self-start">
                <FlagIcon size={20} />
                {explanation.topic.name}
            </span>
        </header>
    );
}
