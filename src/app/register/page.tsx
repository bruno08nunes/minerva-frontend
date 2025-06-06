import Header from "@/components/layout/Header";
import RegisterForm from "@/components/layout/form/RegisterForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";


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
            <h1 className="text-[#D3B1C2] text-center text-3xl my-4">
                Cadastrar-se
            </h1>
            <RegisterForm />
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
