"use client";

import { createIconAction } from "@/action/admin/create/create-icon-action";
import Button from "@/components/layout/form/Button";
import FileInput from "@/components/layout/form/FileInput";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function CreateIconForm({ token }: { token: string }) {
    const [state, formAction] = useActionState(createIconAction, {
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
            className="flex flex-col gap-4 justify-center"
        >
            <FileInput />
            <input type="hidden" name="token" value={token} />
            <Button text="Criar" />
        </form>
    );
}
