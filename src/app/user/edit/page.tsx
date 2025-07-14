import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import EditUserForm from "@/components/layout/form/EditUserForm";

export default async function EditUserPage() {
    return (
        <>
            <Header />
            <H1 title="Editar Usuário" />
            <main className="max-w-[800px] mx-auto w-full p-3">
                <EditUserForm />
            </main>
        </>
    );
}
