import Header from "@/components/layout/Header";
import RegisterForm from "@/components/layout/form/RegisterForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import H1 from "@/components/layout/H1";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Criar Conta | Minerva",
    description:
        "Crie sua conta no Minerva e comece a aprender programação com gamificação.",
    robots: {
        index: false,
        follow: true,
    },
};

export default async function Register() {
    const cookie = await cookies();
    const token = cookie.get("token");

    if (token) {
        redirect("/");
    }

    return (
        <>
            <Header isSticky={false} />
            <H1 title="Cadastrar-se" />
            <RegisterForm />
            <p className="text-lavender-blush text-center mt-4">
                Já possui uma conta? {}
                <Link href={"/login"} className="underline">
                    Faça login
                </Link>
            </p>
            <Link
                href={"/"}
                className="text-center text-lavender-blush underline my-4"
            >
                Estude sem fazer cadastro
            </Link>
        </>
    );
}
