import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import EditUserForm from "@/components/layout/form/EditUserForm";
import { listProfilePictures } from "@/lib/api/profile-pictures";
import { getMe } from "@/lib/api/user";
import getAuthToken from "@/lib/token";
import { redirect } from "next/navigation";

export default async function EditUserPage() {
    const token = await getAuthToken();

    if (!token) {
        redirect("/");
    }

    const userData = await getMe({token});
    const profilePicturesData = await listProfilePictures();

    return (
        <>
            <Header />
            <H1 title="Editar Usuário" />
            <main className="max-w-[800px] mx-auto w-full p-3">
                <EditUserForm user={userData?.user} token={token} profilePictures={profilePicturesData.data ?? []} />
            </main>
        </>
    );
}
