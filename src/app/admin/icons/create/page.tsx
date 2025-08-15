import CreateIconForm from "@/components/admin/forms/create/CreateIconForm";
import H1 from "@/components/layout/H1";

export default async function CreateIconAdminPage() {
    return (
        <section className="w-full">
            <H1 title="Criar Ícone" />
            <CreateIconForm />
        </section>
    );
}