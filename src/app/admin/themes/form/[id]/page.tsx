import H1 from "@/components/layout/H1";
import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";
import Textarea from "@/components/layout/form/Textarea";

export default async function AdminThemeForm() {
    return (
        <section className="w-full">
            <H1 title="Editar Tema" />
            <form
                action=""
                className="max-w-[700px] w-full mx-auto flex flex-col gap-6 px-5"
            >
                <div className="flex gap-4 flex-col sm:flex-row">
                    <Input id="name" label="Nome do tema:" placeholder="Nome" />
                    <Input id="slug" label="Identificador:" placeholder="Slug" />
                </div>
                <Textarea id="description" label="Descrição:" placeholder="Descrição" />
                <Input id="icon" label="Ícone:" placeholder="" />
                <Button text="Editar" />
            </form>
        </section>
    );
}
