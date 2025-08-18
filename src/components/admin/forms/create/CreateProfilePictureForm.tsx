"use client";

import { createProfilePictureAction } from "@/action/admin/create/create-profile-picture-action";
import Button from "@/components/layout/form/Button";
import FileInput from "@/components/layout/form/FileInput";
import Textarea from "@/components/layout/form/Textarea";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function CreateProfilePictureForm({ token }: { token: string }) {
    const [state, formAction] = useActionState(createProfilePictureAction, {
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
            redirect("/admin/profilePictures");
        }
    }, [state]);

    return (
        <form
            action={formAction}
            className="flex flex-col gap-4 justify-center"
        >
            <FileInput />
            <Textarea id="description" label="Descrição:" placeholder="Descrição" maxLength={255} />
            <input type="hidden" name="token" value={token} />
            <Button text="Criar" />
        </form>
    );
}
