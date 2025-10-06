"use client";

import { editThemeAction } from "@/action/admin/edit/edit-theme-action";
import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";
import Textarea from "@/components/layout/form/Textarea";
import { Theme } from "@/types/theme";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import SetIconDialog from "../../SetIconDialog";
import { Icon } from "@/types/icon";
import { deleteTheme } from "@/action/admin/delete/delete-theme";

const handleDeleteTheme = async ({
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

    const errorOnDelete = await deleteTheme(id, token);

    if (errorOnDelete) {
        toast("Erro ao Deletar");
        return;
    }

    redirect("/admin");
};

export default function EditThemeForm({
    theme,
    token,
    icons = [],
}: {
    theme?: Theme;
    token: string;
    icons?: Icon[];
}) {
    const [currentIcon, setCurrentIcon] = useState(
        theme?.icon as Icon | undefined
    );
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
            <SetIconDialog
                icons={icons}
                currentIcon={currentIcon}
                setCurrentIcon={setCurrentIcon}
            />
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
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="themeId" value={theme?.id ?? ""} />
            <input type="hidden" name="iconId" value={currentIcon?.id ?? ""} />
            <div className="flex">
                <Button text="Editar" />
                <Button
                    text="Deletar"
                    type="button"
                    onClick={() => handleDeleteTheme({ id: theme?.id!, token })}
                />
            </div>
        </form>
    );
}
