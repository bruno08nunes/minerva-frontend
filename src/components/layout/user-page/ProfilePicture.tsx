import Image, { StaticImageData } from "next/image";

export default function ProfilePicture({
    profilePicture,
    userName,
}: {
    profilePicture: string | StaticImageData;
    userName: string;
}) {
    return (
        <Image
            src={profilePicture}
            width={400}
            height={400}
            alt={`Foto de perfil de ${userName}`}
            className="max-w-25 rounded-full object-cover aspect-square self-center"
        />
    );
}
