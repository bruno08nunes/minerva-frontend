"use server";

import { logOut } from "@/lib/token";
import { redirect } from "next/navigation";

export const logoutAction = async () => {
    await logOut();
    redirect("/");
}