import CreateThemeForm from "@/components/admin/forms/create/CreateThemeForm";
import H1 from "@/components/layout/H1";
import listIcons from "@/lib/api/icons";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";

export default async function CreateThemeAdminPage() {
    const token = await getAuthToken();

    if (!token) {
        redirect("/");
    }

    const { data: icons } = await listIcons();

    return (
        <section className="w-full">
            <H1 title="Teste" />
            <CreateThemeForm token={token} icons={icons} />
        </section>
    );
}
