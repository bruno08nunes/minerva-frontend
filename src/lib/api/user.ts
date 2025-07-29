import { env } from "@/lib/env";
import type { User } from "@/types/user";

export async function getUserProfile({
    username,
    token,
}: {
    username: string;
    token?: string;
}): Promise<
    | {
          user: User & { isCurrentUser: boolean; isFollowing: boolean };
          message: string;
          success: true;
      }
    | { message: string; success: false }
> {
    try {
        const res = await fetch(
            `${env.NEXT_PUBLIC_API_URL}/users/${username}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "",
                },
            }
        );
        const {
            user,
            message,
            success,
        }: {
            user: User & { isCurrentUser: boolean; isFollowing: boolean };
            message: string;
            success: boolean;
        } = await res.json();

        if (res.status === 404) {
            throw new Error("Usuário não encontrado.");
        }

        return { user, message, success };
    } catch (err) {
        if (err instanceof Error) {
            return { message: err.message || "Erro interno.", success: false };
        }
        return { message: "Erro interno.", success: false };
    }
}

export async function getMe({ token }: { token: string }) {
    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/me`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
        });
        const data: {
            user: User & { email: string };
            success: boolean;
            message: string;
        } = await res.json();

        if (res.status === 404) {
            throw new Error("Usuário não encontrado!");
        }

        if (!res.ok || !data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (err) {
        if (err instanceof Error) {
            return {
                message: err.message || "Erro interno.",
                success: false,
                user: null,
            };
        }
        return { message: "Erro interno.", success: false, user: null };
    }
}

export async function followFetch({
    token,
    followingId,
}: {
    token: string;
    followingId: string;
}) {
    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/follow`, {
            method: "POST",
            body: JSON.stringify({
                followingId,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
        });

        if (res.status === 401) {
            throw new Error(
                "O usuário deve estar logado para seguir outro usuário."
            );
        }

        const result: {
            success: boolean;
            message: string;
        } = await res.json();

        if (!res.ok && !result.success) {
            throw new Error("Erro interno.");
        }

        return { success: result.success, message: result.message };
    } catch (err) {
        if (err instanceof Error) {
            return {
                message: err.message || "Erro interno.",
                success: false,
            };
        }
        return { message: "Erro interno.", success: false };
    }
}

export async function unfollowFetch({
    token,
    followingId,
}: {
    token: string;
    followingId: string;
}) {
    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/follow`, {
            method: "DELETE",
            body: JSON.stringify({
                followingId,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
        });

        if (res.status === 401) {
            throw new Error(
                "O usuário deve estar logado para seguir outro usuário."
            );
        }

        if (res.status === 404) {
            throw new Error("O usuário não segue esse usuário.");
        }

        const result: {
            success: boolean;
            message: string;
        } = await res.json();

        if (!res.ok && !result.success) {
            throw new Error("Erro interno.");
        }

        return { success: result.success, message: result.message };
    } catch (err) {
        if (err instanceof Error) {
            return {
                message: err.message || "Erro interno.",
                success: false,
            };
        }
        return { message: "Erro interno.", success: false };
    }
}
