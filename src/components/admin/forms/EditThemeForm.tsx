"use client";

import { editThemeAction } from "@/action/admin/edit-theme-action";
import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";
import Textarea from "@/components/layout/form/Textarea";
import { Theme } from "@/types/theme";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function EditThemeForm({
    theme,
    token,
}: {
    theme?: Theme;
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
            redirect("/admin/themes");
        }
    }, [state]);

    return (
        <form
            action={formAction}
            className="max-w-[700px] w-full mx-auto flex flex-col gap-6 px-5"
        >
            <div className="flex gap-4 flex-col sm:flex-row">
                <Input
                    id="name"
                    label="Nome do tema:"
                    placeholder="Nome"
                    defaultValue={theme?.name}
                />
                <Input
                    id="slug"
                    label="Identificador:"
                    placeholder="Slug"
                    defaultValue={theme?.slug}
                />
            </div>
            <Textarea
                id="description"
                label="Descrição:"
                placeholder="Descrição"
                defaultValue={theme?.description}
            />
            <Input
                id="icon"
                label="Ícone:"
                placeholder=""
                defaultValue={theme?.icon?.id}
            />
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="themeId" value={theme?.id ?? ""} />
            <Button text="Editar" />
        </form>
    );
}
