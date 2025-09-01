import H1 from "@/components/layout/H1";
import listProfilePictures from "@/lib/api/profilePictures";
import { env } from "@/lib/env";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";

export default async function ProfilePictureAdminPage() {
    const { message, success, data } = await listProfilePictures();
    const resetProfilePictureCache = async () => {
        "use server";

        revalidateTag("profilePictures");
    };

    return (
        <section className="w-full flex gap-4 flex-col">
            <H1 title="Fotos de Perfil" />
            <Link
                href={"/admin/profilePictures/create"}
                className="w-full bg-plum text-lavender-blush p-4 rounded-md text-center text-xl"
            >
                Criar Foto de Perfil
            </Link>
            <button
                className="w-full bg-plum text-lavender-blush p-4 rounded-md text-center text-xl cursor-pointer"
                onClick={resetProfilePictureCache}
            >
                Resetar Cache
            </button>
            {success ? (
                data?.map((profilePicture) => (
                    <Link
                        href={`/admin/profilePictures/update/${profilePicture.id}`}
                        key={profilePicture.id}
                        className="w-full bg-plum text-lavender-blush p-2 rounded-md flex gap-2 items-center text-xl"
                    >
                        <Image
                            src={`${env.NEXT_PUBLIC_API_URL}/uploads/profile-images/${profilePicture.url}`}
                            alt={profilePicture.description ?? ""}
                            width={400}
                            height={400}
                            className="max-w-[100px]"
                        />
                        <p>{profilePicture.description ?? "Sem descrição"}</p>
                    </Link>
                ))
            ) : (
                <p>{message}</p>
            )}
        </section>
    );
}
