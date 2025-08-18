import CreateProfilePictureForm from "@/components/admin/forms/create/CreateProfilePictureForm";
import H1 from "@/components/layout/H1";
import getAuthToken from "@/lib/token";

export default async function CreateProfilePictureAdminPage() {
    const token = await getAuthToken();

    return (
        <section className="w-full">
            <H1 title="Criar Ícone" />
            <CreateProfilePictureForm token={token!} />
        </section>
    );
}