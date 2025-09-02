import EditExplanationForm from "@/components/admin/forms/edit/EditExplanationForm";
import H1 from "@/components/layout/H1";
import { getExplanationById } from "@/lib/api/explanations";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";

export default async function UpdateExplanationAdminPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const token = await getAuthToken();
    const { data: explanation } = await getExplanationById({ id });

    if (!explanation) {
        redirect("/admin/explanations");
    }

    /* 
    if (event.key === 'Tab') {
    event.preventDefault(); // Previne o comportamento padrão

    // Inserir o caractere de tabulação na posição do cursor
    const start = this.selectionStart;
    const end = this.selectionEnd;
    const text = this.value;

    this.value = text.substring(0, start) + '\t' + text.substring(end);

    // Mover o cursor para a posição correta após a tabulação
    this.selectionStart = this.selectionEnd = start + 1;
  }
    */

    return (
        <section className="w-full">
            <H1 title="Editar Explicação" />
            <EditExplanationForm token={token!} explanation={explanation} />
        </section>
    );
}
