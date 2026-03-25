import EditProfilePictureForm from "@/components/admin/forms/edit/EditProfilePictureForm";
import H1 from "@/components/layout/H1";
import { getProfilePictureById } from "@/lib/api/profilePictures";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Edição de Fotos de Perfil | Minerva",
    description: "Área restrita para gerenciamento da plataforma Minerva.",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function EditProfilePictureAdminPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const token = await getAuthToken();

    if (!token) {
        redirect("/");
    }

    const { id } = await params;
    const { message, success, data: profilePicture } = await getProfilePictureById(id);

    return (
        <section className="w-full">
            <H1 title="Editar Foto de Perfil" />
            <EditProfilePictureForm profilePicture={profilePicture} token={token} />
        </section>
    );
}
