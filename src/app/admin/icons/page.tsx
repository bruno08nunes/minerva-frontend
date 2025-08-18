import H1 from "@/components/layout/H1";
import listIcons from "@/lib/api/icons";
import { env } from "@/lib/env";
import Image from "next/image";
import Link from "next/link";

export default async function IconAdminPage() {
    const { message, success, data } = await listIcons();

    return (
        <section className="w-full flex gap-4 flex-col">
            <H1 title="Ícones" />
            {success ? (
                data?.map((icon) => (
                    <Link
                        href={`/admin/icons/update/${icon.id}`}
                        key={icon.id}
                        className="w-full bg-plum text-lavender-blush p-2 rounded-md flex gap-2 items-center text-xl"
                    >
                        <Image
                            src={`${env.NEXT_PUBLIC_API_URL}/uploads/icons/${icon.url}`}
                            alt={icon.description ?? ""}
                            width={400}
                            height={400}
                            className="max-w-[100px]"
                        />
                        <p>{icon.description ?? "Sem descrição"}</p>
                    </Link>
                ))
            ) : (
                <p>{message}</p>
            )}
        </section>
    );
}
