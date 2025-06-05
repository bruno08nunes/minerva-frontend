import Header from "@/components/layout/Header";
import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";
import Link from "next/link";

export default function Login() {
    return (
        <>
            <Header isSticky={false} />
            <h1 className="text-[#D3B1C2] text-center text-3xl my-4">
                Cadastrar-se
            </h1>
            <form className="max-w-[700px] w-full mx-auto flex flex-col gap-6">
                <div className="flex gap-4">
                    <Input
                        id="name"
                        type="text"
                        label="Nome:"
                        placeholder="Nome..."
                    />
                    <Input
                        id="username"
                        type="text"
                        label="Nome de Usuário:"
                        placeholder="@Nome de usuário..."
                    />
                </div>
                <div className="flex gap-4">
                    <Input
                        id="email"
                        type="email"
                        label="Email:"
                        placeholder="Email..."
                    />
                    <Input
                        id="password"
                        type="password"
                        label="Senha:"
                        placeholder="Senha..."
                    />
                </div>
                <Button text="Cadastrar-se" />
            </form>
            <p className="text-[#D3B1C2] text-center mt-4">
                Já possui uma conta? {}
                <Link href={"/login"} className="underline">
                    Faça login
                </Link>
            </p>
            <Link
                href={"/"}
                className="text-center text-[#D3B1C2] underline my-4"
            >
                Estude sem fazer cadastro
            </Link>
        </>
    );
}
