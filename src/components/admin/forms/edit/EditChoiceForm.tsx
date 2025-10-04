"use client";

import { editChoiceAction } from "@/action/admin/edit/edit-choice-action";
import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";
import { Choice } from "@/types/choice";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function EditChoiceForm({
    choice,
    token,
}: {
    choice: Choice;
    token: string;
}) {
    const [state, formAction] = useActionState(editChoiceAction, {
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
            <Input id="text" label="Texto:" placeholder="Texto" defaultValue={choice.text} />
            <Input id="order" label="Ordem:" placeholder="Ordem" defaultValue={choice.order} />
            <label className="text-lavender-blush text-xl">
                Está Correto? <input type="checkbox" name="isCorrect" defaultChecked={choice.isCorrect} />
            </label>
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="id" value={choice.id} />
            <Button text="Enviar" />
        </form>
    );
}
