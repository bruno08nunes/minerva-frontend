import Header from "@/components/layout/Header";
import { getIsAdmin } from "@/lib/api/user";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function AdminLayout({ children }: { children: any }) {
    const token = (await getAuthToken()) ?? "";
    const isAdmin = await getIsAdmin({ token });

    if (!isAdmin) {
        redirect("/");
    }

    return (
        <>
            <Header />
            <main className="p-3 max-w-[800px] w-full mx-auto">{children}</main>
        </>
    );
}
