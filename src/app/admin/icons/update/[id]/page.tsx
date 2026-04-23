import EditIconForm from "@/components/admin/forms/edit/EditIconForm";
import H1 from "@/components/layout/H1";
import { getIconById } from "@/lib/api/icons";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Edição de Ícones | Minerva",
    description: "Área restrita para gerenciamento da plataforma Minerva.",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function EditIconAdminPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const token = await getAuthToken();

    if (!token) {
        redirect("/");
    }

    const { id } = await params;
    const { data: icon } = await getIconById(id);

    return (
        <section className="w-full">
            <H1 title="Editar Ícone" />
            <EditIconForm icon={icon} token={token} />
        </section>
    );
}
