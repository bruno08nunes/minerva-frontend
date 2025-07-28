import Link from "next/link";
import FollowButton from "./FollowButton";

export default function UserPageButton({
    isCurrentUser,
    isFollowing,
}: {
    isCurrentUser: boolean;
    isFollowing: boolean;
}) {
    return isCurrentUser ? (
        <Link href={"/user/edit"} className="bg-lavender-blush p-3 rounded-4xl">
            Editar Perfil
        </Link>
    ) : (
        <FollowButton isFollowing={isFollowing} />
    );
}
