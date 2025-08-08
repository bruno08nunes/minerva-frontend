import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import { env } from "@/lib/env";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";

export default async function AdminPage() {
    const token = await getAuthToken();
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/admin`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    
    if (!res.ok) {
        redirect("/");
    }

    return (
        <>
            <Header />
            <H1 title="Administrador" />
        </>
    );
}
