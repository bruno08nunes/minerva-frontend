import Header from "@/components/layout/Header";
import LoginForm from "@/components/layout/form/LoginForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import H1 from "@/components/layout/H1";

export default async function Login() {
    const cookie = await cookies();
    const token = cookie.get("token");

    if (token) {
        redirect("/");
    }

    return (
        <>
            <Header isSticky={false} />
            <H1 title="Login" />
            <LoginForm />
            <p className="text-lavender-blush text-center mt-4">
                Não possui uma conta? {}
                <Link href={"/register"} className="underline">
                    Cadastre-se
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
