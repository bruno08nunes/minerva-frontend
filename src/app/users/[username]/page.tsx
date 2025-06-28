import Header from "@/components/layout/Header";
import Image from "next/image";
import profilePictureImage from "../../../../public/theme_placeholder/detective.png";
import { getUserProfile } from "@/lib/api/user";

export default async function UserProfilePage({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;

    const userData = await getUserProfile({ username });

    if (!userData.success) {
        // TODO: Create not found page
        throw new Error(userData.message);
    }

    const { user } = userData;

    const profilePicture = user.profilePicture?.url || profilePictureImage;

    return (
        <>
            <Header />
            <section className="flex justify-between bg-plum w-full max-w-[800px] mx-auto mt-8 p-4 rounded-xl items-center">
                <div className="flex gap-4 items-center">
                    <Image
                        src={profilePicture}
                        alt={`Foto de perfil de ${user.name}`}
                        className="max-w-25 rounded-full object-cover aspect-square"
                    />
                    <div className="flex flex-col text-xl text-lavender-blush">
                        <div className="flex gap-3 items-baseline">
                            <span className="text-center mt-4 font-bold text-2xl">
                                {user.name}
                            </span>
                            <span>@{user.username}</span>
                        </div>
                        <span>{user.totalXP} - POSIÇÃO</span>
                    </div>
                </div>
                <button className="bg-lavender-blush p-3 rounded-4xl cursor-pointer">
                    Personalizar conta
                </button>
            </section>
        </>
    );
}
