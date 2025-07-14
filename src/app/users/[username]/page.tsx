import Header from "@/components/layout/Header";
import Image from "next/image";
import profilePictureFallback from "../../../../public/theme_placeholder/detective.png";
import { getUserProfile } from "@/lib/api/user";
import { env } from "@/lib/env";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function UserProfilePage({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;
    const token = (await cookies()).get("token")?.value;

    const userData = await getUserProfile({ username, token });

    if (!userData.success) {
        // TODO: Create not found page
        throw new Error(userData.message);
    }

    const { user } = userData;

    const profilePicture = user.profilePicture?.url || profilePictureFallback;
    const { followers: followersAmount, following: followingAmount } =
        user._count;

    const { isCurrentUser } = user;

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
                        <span>{user.totalXP}XP</span>
                        <span>
                            {followersAmount ?? 0} Seguidores -{" "}
                            {followingAmount ?? 0} Seguindo
                        </span>
                    </div>
                </div>
                {isCurrentUser ? (
                    <Link href={"/user/edit"} className="bg-lavender-blush p-3 rounded-4xl">Editar Perfil</Link>
                ) : (
                    <button className="bg-lavender-blush p-3 rounded-4xl cursor-pointer">
                        Seguir
                    </button>
                )}
            </section>
            <section>
                {user.achievements.length > 0 && (
                    <>
                        <h2 className="p-4 text-lavender-blush text-2xl font-bold my-4 max-w-[800px] mx-auto text-center">
                            Conquistas
                        </h2>
                        {user.achievements.map((userAchievement) => (
                            <div
                                key={userAchievement.achievement.id}
                                className="flex items-center gap-4 p-4 bg-plum text-lavender-blush rounded-xl my-4 max-w-[800px] mx-auto"
                            >
                                <Image
                                    src={`${env.NEXT_PUBLIC_API_URL}/uploads/icons/${userAchievement.achievement.icon.url}`}
                                    alt={userAchievement.achievement.name}
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />
                                <div>
                                    <h3 className="text-xl font-bold">
                                        {userAchievement.achievement.name}
                                    </h3>
                                    <p>
                                        {
                                            userAchievement.achievement
                                                .description
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </section>
        </>
    );
}
