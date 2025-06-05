import Header from "@/components/layout/Header";
import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";
import Link from "next/link";

export default function Login() {
    return (
        <>
            <Header isSticky={false} />
            <h1 className="text-[#D3B1C2] text-center text-3xl my-4">Login</h1>
            <form className="max-w-[700px] w-full mx-auto flex flex-col gap-6 px-5">
                <Input id="email" type="email" label="Email" placeholder="Email..." />
                <Input id="password" type="password" label="Senha" placeholder="Senha..." />
                <Button text="Entrar" />
            </form>
            <p className="text-[#D3B1C2] text-center mt-4">
                Não possui uma conta? { }
                <Link href={"/register"} className="underline">Cadastre-se</Link>
            </p>
            <Link href={"/"} className="text-center text-[#D3B1C2] underline my-4">Estude sem fazer cadastro</Link>
        </>
    );
}
