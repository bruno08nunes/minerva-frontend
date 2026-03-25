import CreateProfilePictureForm from "@/components/admin/forms/create/CreateProfilePictureForm";
import H1 from "@/components/layout/H1";
import getAuthToken from "@/lib/token";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Envio de Novas Fotos de Perfil | Minerva",
    description: "Área restrita para gerenciamento da plataforma Minerva.",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function CreateProfilePictureAdminPage() {
    const token = await getAuthToken();

    return (
        <section className="w-full">
            <H1 title="Criar Foto de Perfil" />
            <CreateProfilePictureForm token={token!} />
        </section>
    );
}