"use client";

import { createExplanationAction } from "@/action/admin/create/create-explanation-action";
import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";
import Textarea from "@/components/layout/form/Textarea";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function CreateExplanationForm({ token }: { token: string }) {
    const [state, formAction] = useActionState(createExplanationAction, {
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
            <Input id="title" label="Título:" placeholder="Título" />
            <Textarea
                id="description"
                label="Descrição:"
                placeholder="Descrição"
            />
            <Textarea id="content" label="Conteúdo:" placeholder="Conteúdo" />
            <Input id="topicId" label="Tópico:" placeholder="Tópico" />
            <input type="hidden" name="token" value={token} />
            <Button text="Criar" />
        </form>
    );
}
