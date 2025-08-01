"use client";

import { followFetch, unfollowFetch } from "@/lib/api/user";
import { useState } from "react";

export default function FollowButton({
    isFollowing,
    userId,
    token,
}: {
    isFollowing: boolean;
    userId: string;
    token: string;
}) {
    const [isFollowingState, setIsFollowingState] = useState(isFollowing);
    const [isLoading, setIsLoading] = useState(false);

    const follow = async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        const { success } = await followFetch({ token, followingId: userId });

        if (success) {
            setIsFollowingState(true);
        }

        setIsLoading(false);
    };

    const unfollow = async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        const { success } = await unfollowFetch({ token, followingId: userId });

        if (success) {
            setIsFollowingState(false);
        }

        setIsLoading(false);
    };

    return isFollowingState ? (
        <button
            className="bg-lavender-blush p-3 rounded-4xl cursor-pointer max-w-[200px] w-full text-center"
            onClick={() => unfollow()}
        >
            Deixar de Seguir
        </button>
    ) : (
        <button
            className="bg-lavender-blush p-3 rounded-4xl cursor-pointer max-w-[200px] w-full text-center"
            onClick={() => follow()}
        >
            Seguir
        </button>
    );
}
