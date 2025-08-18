import CreateIconForm from "@/components/admin/forms/create/CreateIconForm";
import H1 from "@/components/layout/H1";
import getAuthToken from "@/lib/token";

export default async function CreateIconAdminPage() {
    const token = await getAuthToken();

    return (
        <section className="w-full">
            <H1 title="Criar Ícone" />
            <CreateIconForm token={token!} />
        </section>
    );
}