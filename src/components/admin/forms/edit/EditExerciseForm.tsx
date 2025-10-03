"use client";

import { editExerciseAction } from "@/action/admin/edit/edit-exercise-action";
import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";
import Textarea from "@/components/layout/form/Textarea";
import { Exercise } from "@/types/exercise";
import { parseMarkdownToText } from "@/utils/parseMarkdown";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function EditExerciseForm({
    exercise,
    token,
}: {
    exercise: Exercise;
    token: string;
}) {
    const content = parseMarkdownToText(exercise.content ?? []);

    const [state, formAction] = useActionState(editExerciseAction, {
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
            <Input
                id="hint"
                placeholder="Dica"
                label="Dica:"
                defaultValue={exercise.hint}
            />
            <Textarea
                id="content"
                label="Conteúdo"
                placeholder="Conteúdo"
                defaultValue={content}
            />
            <Link
                href={`/admin/exercises/${exercise.id}/choices/`}
                className="bg-plum text-lavender-blush text-center rounded-4xl py-1.5 px-6 text-lg max-w-[200px]"
            >
                Alterar Escolhas
            </Link>
            <Button text="Enviar" />
            <input type="hidden" name="id" value={exercise.id} />
            <input type="hidden" name="token" value={token} />
        </form>
    );
}
