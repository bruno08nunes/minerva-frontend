import Header from "@/components/layout/Header";
import LoginForm from "@/components/layout/form/LoginForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Login() {
    const cookie = await cookies();
    const token = cookie.get("token");

    if (token) {
        redirect("/");
    }

    return (
        <>
            <Header isSticky={false} />
            <h1 className="text-[#D3B1C2] text-center text-3xl my-4">Login</h1>
            <LoginForm />
            <p className="text-[#D3B1C2] text-center mt-4">
                Não possui uma conta? {}
                <Link href={"/register"} className="underline">
                    Cadastre-se
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
