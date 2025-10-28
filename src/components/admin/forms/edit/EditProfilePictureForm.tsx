"use client";

import Button from "@/components/layout/form/Button";
import Textarea from "@/components/layout/form/Textarea";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { ProfilePicture } from "@/types/profile-picture";
import FileInput from "@/components/layout/form/FileInput";
import { editProfilePictureAction } from "@/action/admin/edit/edit-profile-picture-action";
import { deleteProfilePicture } from "@/action/admin/delete/delete-profile-picture";

const handleDeleteProfilePicture = async ({
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

    const errorOnDelete = await deleteProfilePicture(id, token);

    if (errorOnDelete) {
        toast("Erro ao Deletar");
        return;
    }

    redirect("/admin");
};

export default function EditProfilePictureForm({
    profilePicture,
    token,
}: {
    profilePicture?: ProfilePicture;
    token: string;
}) {
    const [state, formAction] = useActionState(editProfilePictureAction, {
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
            className="max-w-[700px] w-full mx-auto flex flex-col gap-6 px-5"
        >
            <FileInput defaultUrl={profilePicture?.url} type="profile-images" />
            <Textarea
                id="description"
                label="Descrição:"
                placeholder="Descrição"
                defaultValue={profilePicture?.description}
            />
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="id" value={profilePicture?.id ?? ""} />
            <div className="flex">
            <Button text="Editar" />
            <Button text="Excluir" type="button" onClick={() => handleDeleteProfilePicture({id: profilePicture?.id!, token})} />
            </div>
        </form>
    );
}
