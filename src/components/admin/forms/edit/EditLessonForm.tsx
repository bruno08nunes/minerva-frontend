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
import { Lesson } from "@/types/lesson";
import { editLessonAction } from "@/action/admin/edit/edit-lesson-action";
import { deleteLesson } from "@/action/admin/delete/delete-lesson";

const handleDeleteLesson = async ({
    id,
    token,
}: {
    id: string;
    token: string;
}) => {
    const willDelete = confirm("Deseja Deletar?");

    if (!willDelete) {
        return;
    }

    const errorOnDelete = await deleteLesson(id, token);

    if (errorOnDelete) {
        toast("Erro ao Deletar");
        return;
    }

    redirect("/admin");
};

export default function EditLessonForm({
    topics,
    themes,
    token,
    lesson,
}: {
    topics: Topic[];
    themes: Theme[];
    token: string;
    lesson: Lesson;
}) {
    const initialTopic = topics.find((topic) => topic.id === lesson.topic.id);
    const initialTheme = themes.find((theme) => theme.id === lesson.theme.id);

    const [currentTopic, setCurrentTopic] = useState(initialTopic ?? topics[0]);
    const [currentTheme, setCurrentTheme] = useState(initialTheme ?? themes[0]);

    const [state, formAction] = useActionState(editLessonAction, {
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
        <form
            className="flex flex-col gap-4 justify-center"
            action={formAction}
        >
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
            <Input id="name" label="Nome:" placeholder="Nome" defaultValue={lesson.name} />
            <Textarea
                id="description"
                label="Descrição:"
                placeholder="Descrição"
                defaultValue={lesson.description}
            />
            <Input
                id="rewardXP"
                label="XP de Recompensa:"
                placeholder="XP de Recompensa"
                defaultValue={lesson.rewardXP}
            />
            <Input id="order" label="Ordem:" placeholder="Ordem" defaultValue={lesson.order} />
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
                value={lesson.icon.id}
            />
            <input type="hidden" id="token" name="token" value={token} />
            <input type="hidden" id="id" name="id" value={lesson.id} />
            <div className="flex">
                <Button text="Enviar" />
                <Button text="Excluir" type="button" onClick={() => handleDeleteLesson({token, id: lesson.id})} />
            </div>
        </form>
    );
}
