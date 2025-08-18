import { env } from "@/lib/env";
import Image from "next/image";
import { useState } from "react";

export default function FileInput({
    defaultUrl,
    type = "icons",
}: {
    defaultUrl?: string;
    type?: "icons" | "profile-images";
}) {
    const [icon, setIcon] = useState(defaultUrl ?? "");
    const url =
        icon === defaultUrl
            ? `${env.NEXT_PUBLIC_API_URL}/uploads/${type}/${defaultUrl}`
            : icon;

    const handleChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fr = new FileReader();
        fr.onload = () => {
            setIcon(fr.result as string);
        };
        const fileList = e.target.files;
        if (fileList && fileList) {
            fr.readAsDataURL(fileList[0]);
        }
    };

    return (
        <div className="flex gap-4 items-center justify-center">
            {icon ? (
                <Image
                    src={url}
                    width={400}
                    height={400}
                    alt="Sua foto de perfil atual"
                    className="w-35 bg-plum rounded-full"
                />
            ) : (
                <div className="w-35 bg-plum rounded-full aspect-square" />
            )}
            <label className="border-2 border-lavender-blush text-lavender-blush p-3 cursor-pointer hover:scale-110 transition">
                Adicionar Ícone
                <input
                    type="file"
                    name="file"
                    id="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleChangeFileInput}
                />
            </label>
        </div>
    );
}
