import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import EditUserForm from "@/components/layout/form/EditUserForm";
import { env } from "@/lib/env";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function EditUserPage() {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
        redirect("/");
    }

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/me`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
        },
    });
    const data = await res.json();

    return (
        <>
            <Header />
            <H1 title="Editar Usuário" />
            <main className="max-w-[800px] mx-auto w-full p-3">
                <EditUserForm user={data.user} />
            </main>
        </>
    );
}
