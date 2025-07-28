import { cookies } from "next/headers";

export default async function getAuthToken() {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    return token;
}