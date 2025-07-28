export default function FollowButton({
    isFollowing,
}: {
    isFollowing: boolean;
}) {
    return (
        <button className="bg-lavender-blush p-3 rounded-4xl cursor-pointer">
            {isFollowing ? "Deixar de Seguir" : "Seguir"}
        </button>
    );
}
