"use client";

import { Icon } from "@/types/icon";
import SetIconDialog from "../../SetIconDialog";
import { useActionState, useEffect, useState } from "react";
import Input from "@/components/layout/form/Input";
import Textarea from "@/components/layout/form/Textarea";
import Button from "@/components/layout/form/Button";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { createThemeAction } from "@/action/admin/create/create-theme-action";

export default function CreateThemeForm({
    icons = [],
    token,
}: {
    icons?: Icon[];
    token: string;
}) {
    const [currentIcon, setCurrentIcon] = useState(
        undefined as Icon | undefined
    );

    const [state, formAction] = useActionState(
        createThemeAction,
        {
            success: false,
            message: "",
        }
    );

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
                <Input id="name" label="Nome do tema:" placeholder="Nome" />
                <Input id="slug" label="Identificador:" placeholder="Slug" />
            </div>
            <Textarea
                id="description"
                label="Descrição:"
                placeholder="Descrição"
            />
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="iconId" value={currentIcon?.id ?? ""} />
            <Button text="Criar" />
        </form>
    );
}
