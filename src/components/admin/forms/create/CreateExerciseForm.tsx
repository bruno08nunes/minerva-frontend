"use client";

import { createExerciseAction } from "@/action/admin/create/create-exercise-action";
import { editExerciseAction } from "@/action/admin/edit/edit-exercise-action";
import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";
import Textarea from "@/components/layout/form/Textarea";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const exercisesTypes = ["MULTIPLE_CHOICE", "WRITE_CODE", "COMPLETE_CODE"];

export default function CreateExerciseForm({
    token,
    lessonId
}: {
    token: string;
    lessonId: string;
}) {
    const [state, formAction] = useActionState(createExerciseAction, {
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
            />
            <Textarea
                id="content"
                label="Conteúdo"
                placeholder="Conteúdo"
            />
            <div className="flex flex-col gap-2 grow">
                <label htmlFor="type" className="text-lavender-blush text-xl">
                    Tipo:
                </label>
                <select
                    name="type"
                    id="type"
                    className="bg-white p-1.5 rounded-md"
                >
                    {exercisesTypes.map((exerciseType) => (
                        <option value={exerciseType} key={exerciseType}>
                            {exerciseType}
                        </option>
                    ))}
                </select>
            </div>
            <Button text="Enviar" />
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="lessonId" value={lessonId} />
        </form>
    );
}
