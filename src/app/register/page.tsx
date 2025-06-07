import Header from "@/components/layout/Header";
import RegisterForm from "@/components/layout/form/RegisterForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import H1 from "@/components/layout/H1";


// TODO: Verify if header will contain the links and buttons on login and register page
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
