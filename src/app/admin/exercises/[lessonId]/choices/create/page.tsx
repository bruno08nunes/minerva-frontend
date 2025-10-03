import CreateChoiceForm from "@/components/admin/forms/create/CreateChoiceForm";
import H1 from "@/components/layout/H1";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";

export default async function ChoiceCreateAdminPage({
    params,
}: {
    params: Promise<{ lessonId: string }>;
}) {
    const { lessonId: exerciseId } = await params;
    const token = await getAuthToken();

    if (!token) {
        redirect("/admin");
    }

    return (
        <section className="w-full">
            <H1 title={`Criar Alternativa`} />
           <CreateChoiceForm exerciseId={exerciseId} token={token} />
        </section>
    );
}
