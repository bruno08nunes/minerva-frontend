import Header from "@/components/layout/Header";
import { env } from "@/lib/env";

export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/${username}`);
    const { user, message, success } = await res.json();

    return (
        <>
            <Header />
            {
                success ? (
                    <h1 className="text-lavender-blush text-center mt-4 text-xl font-bold">Hello, {user.name}!</h1>
                ) : (
                    <p>{message}</p>
                )
            }
        </>
    );
}