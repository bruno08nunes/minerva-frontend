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

    const buttons = {
        "follow": <button
            className="bg-lavender-blush p-3 rounded-4xl cursor-pointer max-w-[200px] w-full text-center hover:bg-transparent hover:text-lavender-blush border-3 border-lavender-blush transition duration-[0.4s]"
            onClick={() => follow()}
        >
            Seguir
        </button>,
        "unfollow": <button
            className="bg-lavender-blush p-3 rounded-4xl cursor-pointer max-w-[200px] w-full text-center hover:bg-transparent hover:text-lavender-blush border-3 border-lavender-blush transition duration-[0.4s]"
            onClick={() => unfollow()}
        >
            Deixar de Seguir
        </button>,
        "loading": <button
            className="bg-lavender-blush p-3 rounded-4xl cursor-pointer max-w-[200px] w-full text-center animate-pulse border-3 border-lavender-blush"
            onClick={() => unfollow()}
        >
            Carregando...
        </button>,
    };

    const state = isLoading ? "loading" : isFollowingState ? "unfollow" : "follow";

    return buttons[state];
}
