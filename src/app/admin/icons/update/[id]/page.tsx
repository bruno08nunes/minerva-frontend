import H1 from "@/components/layout/H1";
import { getIconById } from "@/lib/api/icons";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";

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
    const { message, success, data: icon } = await getIconById(id);

    return (
        <section className="w-full">
            <H1 title="Editar Ícone" />
        </section>
    );
}
