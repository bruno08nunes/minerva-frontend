"use client";

import { editExplanationAction } from "@/action/admin/edit/edit-explanation-action";
import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";
import Textarea from "@/components/layout/form/Textarea";
import { Explanation } from "@/types/explanation";
import { parseMarkdownToText } from "@/utils/parseMarkdown";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import SetTopicDialog from "../../SetTopicDialog";
import { Topic } from "@/types/topic";

export default function EditExplanationForm({
    explanation,
    token,
    topics,
}: {
    explanation: Explanation;
    token: string;
    topics: Topic[];
}) {
    const [currentTopic, setCurrentTopic] = useState<Topic>(explanation.topic);

    const content = parseMarkdownToText(explanation?.content ?? []);

    const [state, formAction] = useActionState(editExplanationAction, {
        success: false,
        message: "",
    });

    useEffect(() => {
        if (state.message && state.success === false) {
            toast.error(state.message, {
                duration: 3000,
                position: "top-center",
                style: { color: "red" },
            });
        }

        if (state.success) {
            redirect("/admin/explanations");
        }
    }, [state]);

    return (
        <form
            className="flex flex-col gap-4 justify-center"
            action={formAction}
        >
            <Input
                id="title"
                label="Título:"
                placeholder="Título"
                defaultValue={explanation?.title}
            />
            <Textarea
                id="description"
                label="Descrição:"
                placeholder="Descrição"
                defaultValue={explanation?.description}
            />
            <Textarea
                id="content"
                label="Conteúdo:"
                placeholder="Conteúdo"
                defaultValue={content}
            />
            <p className="text-lavender-blush text-xl">Tópico:</p>
            <SetTopicDialog
                setCurrentTopic={setCurrentTopic}
                topics={topics}
                currentTopic={currentTopic}
            />
            <input type="hidden" name="id" value={explanation?.id} />
            <input type="hidden" name="topicId" value={currentTopic.id ?? ""} />
            <input type="hidden" name="token" value={token} />
            <Button text="Editar" />
        </form>
    );
}
