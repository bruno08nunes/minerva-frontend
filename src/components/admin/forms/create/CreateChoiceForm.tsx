"use client";

import { createChoiceAction } from "@/action/admin/create/create-choice-action";
import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function CreateChoiceForm({
    token,
    exerciseId,
}: {
    token: string;
    exerciseId: string;
}) {
    const [state, formAction] = useActionState(createChoiceAction, {
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
        <form action={formAction} className="flex flex-col gap-4 justify-center">
            <Input id="text" label="Texto:" placeholder="Texto" />
            <Input id="order" label="Ordem:" placeholder="Ordem" />
            <label className="text-lavender-blush text-xl">
                Está Correto? <input type="checkbox" name="isCorrect" />
            </label>
            <input type="hidden" name="exerciseId" value={exerciseId} />
            <input type="hidden" name="token" value={token} />
            <Button text="Enviar" />
        </form>
    );
}
