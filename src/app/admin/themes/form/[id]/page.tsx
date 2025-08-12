import EditThemeForm from "@/components/admin/forms/EditThemeForm";
import H1 from "@/components/layout/H1";
import { getThemeBySlug } from "@/lib/api/themes";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";

export default async function AdminThemeForm({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const token = await getAuthToken();

    if (!token) {
        redirect("/");
    }

    const { id: slug } = await params;
    const { theme } = await getThemeBySlug(slug);

    return (
        <section className="w-full">
            <H1 title="Editar Tema" />
            <EditThemeForm token={token} theme={theme} />
        </section>
    );
}
