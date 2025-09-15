"use client";

import Input from "@/components/layout/form/Input";
import Textarea from "@/components/layout/form/Textarea";
import SetTopicDialog from "../../SetTopicDialog";
import { Topic } from "@/types/topic";
import { Theme } from "@/types/theme";
import { useActionState, useEffect, useState } from "react";
import SetThemeDialog from "../../SetThemeDialog";
import Button from "@/components/layout/form/Button";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { createLessonAction } from "@/action/admin/create/create-lesson-action";

export default function CreateLessonForm({
    topics,
    themes,
    token
}: {
    topics: Topic[];
    themes: Theme[];
    token: string;
}) {
    const [currentTopic, setCurrentTopic] = useState(topics[0]);
    const [currentTheme, setCurrentTheme] = useState(themes[0]);

    const [state, formAction] = useActionState(createLessonAction, {
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
            redirect("/admin/lessons");
        }
    }, [state]);

    return (
        <form className="flex flex-col gap-4 justify-center" action={formAction}>
            <SetTopicDialog
                topics={topics}
                currentTopic={currentTopic}
                setCurrentTopic={setCurrentTopic}
            />
            <SetThemeDialog
                themes={themes}
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
            />
            <Input id="name" label="Nome:" placeholder="Nome" />
            <Textarea
                id="description"
                label="Descrição:"
                placeholder="Descrição"
            />
            <Input
                id="rewardXP"
                label="XP de Recompensa:"
                placeholder="XP de Recompensa"
            />
            <Input id="order" label="Ordem:" placeholder="Ordem" />
            <input
                type="hidden"
                id="themeId"
                name="themeId"
                value={currentTheme.id}
            />
            <input
                type="hidden"
                id="topicId"
                name="topicId"
                value={currentTopic.id}
            />
            <input
                type="hidden"
                id="iconId"
                name="iconId"
                value={currentTopic.icon.id}
            />
            <input
                type="hidden"
                id="token"
                name="token"
                value={token}
            />
            <input
                type="hidden"
                id="iconId"
                name="iconId"
                value={currentTopic.icon.id}
            />
            <Button text="Enviar" />
        </form>
    );
}
