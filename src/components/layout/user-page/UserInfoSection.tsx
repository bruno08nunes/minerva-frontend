import type { User } from "@/types/user";
import { env } from "process";

import profilePictureFallback from "../../../../public/no-picture.png";
import ProfilePicture from "./ProfilePicture";
import UserPageButton from "./UserPageButton";

export default function UserInfoSection({
    user,
}: {
    user: User & { isCurrentUser: boolean; isFollowing: boolean };
}) {
    const profilePicture = user?.profilePicture?.url
        ? `${env.NEXT_PUBLIC_API_URL}/uploads/profile-images/${user.profilePicture?.url}`
        : profilePictureFallback;
    const { followings: followersAmount, followers: followingAmount } =
        user._count;

    const { isCurrentUser, isFollowing } = user;

    return (
        <section className="flex justify-between bg-plum w-full max-w-[800px] mx-auto mt-8 p-4 rounded-xl items-center">
            <div className="flex gap-4 items-center">
                <ProfilePicture
                    profilePicture={profilePicture}
                    userName={user.name}
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
            <UserPageButton
                isCurrentUser={isCurrentUser}
                isFollowing={isFollowing}
            />
        </section>
    );
}
