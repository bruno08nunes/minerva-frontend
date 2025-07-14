import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";

export default async function EditUserPage() {
    return (
        <>
            <Header />
            <H1 title="Editar Usuário" />
            <main className="max-w-[800px] mx-auto w-full">
                <form className="flex flex-col gap-4">
                    <div className="flex gap-4 flex-col sm:flex-row">
                        <Input
                            id="name"
                            label="Nome:"
                            placeholder="Nome..."
                        />
                        <Input
                            id="username"
                            label="Nome de Usuário:"
                            placeholder="@Nome de usuário..."
                        />
                    </div>
                    <div className="flex gap-4 flex-col sm:flex-row">
                        <Input
                            type="email"
                            id="email"
                            label="Email:"
                            placeholder="Email..."
                        />
                        <Input
                            type="password"
                            id="password"
                            label="Senha:"
                            placeholder="Senha..."
                        />
                    </div>
                    <Button text="Editar Usuário" />
                </form>
            </main>
        </>
    );
}
