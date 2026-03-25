import CreateIconForm from "@/components/admin/forms/create/CreateIconForm";
import H1 from "@/components/layout/H1";
import getAuthToken from "@/lib/token";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Criação de Ícones | Minerva",
    description: "Área restrita para gerenciamento da plataforma Minerva.",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function CreateIconAdminPage() {
    const token = await getAuthToken();

    return (
        <section className="w-full">
            <H1 title="Criar Ícone" />
            <CreateIconForm token={token!} />
        </section>
    );
}