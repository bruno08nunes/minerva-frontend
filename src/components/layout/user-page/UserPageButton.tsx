import Link from "next/link";
import FollowButton from "./FollowButton";

export interface UserPageButtonProps {
    isCurrentUser: boolean;
    isFollowing: boolean;
    userId: string;
    token: string;
}

export default function UserPageButton({
    isCurrentUser,
    isFollowing,
    userId,
    token
}: UserPageButtonProps) {
    return isCurrentUser ? (
        <Link href={"/user/edit"} className="bg-lavender-blush p-3 rounded-4xl">
            Editar Perfil
        </Link>
    ) : (
        <FollowButton isFollowing={isFollowing} userId={userId} token={token} />
    );
}
