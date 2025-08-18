"use client";

import Button from "@/components/layout/form/Button";
import Textarea from "@/components/layout/form/Textarea";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Icon } from "@/types/icon";

export default function EditThemeForm({
    icon,
    token,
}: {
    icon?: Icon;
    token: string;
}) {
    const [state, formAction] = useActionState(editThemeAction, {
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
            redirect("/admin/icons");
        }
    }, [state]);

    return (
        <form
            action={formAction}
            className="max-w-[700px] w-full mx-auto flex flex-col gap-6 px-5"
        >
            <Textarea
                id="description"
                label="Descrição:"
                placeholder="Descrição"
                defaultValue={icon?.description}
            />
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="iconId" value={icon?.id ?? ""} />
            <Button text="Editar" />
        </form>
    );
}
