import Header from "@/components/layout/Header";
import Image from "next/image";
import { getUserProfile } from "@/lib/api/user";
import { env } from "@/lib/env";
import { cookies } from "next/headers";
import UserInfoSection from "@/components/layout/user-page/UserInfoSection";

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

    return (
        <>
            <Header />
            <main className="p-3">
                <UserInfoSection user={user} token={token ?? ""} />
                <section>
                    <h2 className="p-4 text-lavender-blush text-2xl font-bold my-4 max-w-[800px] mx-auto text-center">
                        Conquistas
                    </h2>
                    {user.achievements.length > 0 ? (
                        user.achievements.map((userAchievement) => (
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
                        ))
                    ) : (
                        <p className="text-lavender-blush text-center text-xl">
                            Não possui nenhuma conquista ainda :(
                        </p>
                    )}
                </section>
            </main>
        </>
    );
}
