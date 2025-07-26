import { ProfilePicture } from "./profile-picture";

export interface User {
    id: string;
    name: string;
    totalXP: number;
    streak: number;
    lastActiveDay: Date;
    semanalXP: number;
    createdAt: Date;
    updatedAt: Date;
    role: "ADMIN" | "USER";
    username: string;
    profilePictureId: string;
    profilePicture: ProfilePicture;
    _count: {
        followers: number;
        following: number;
    };
    achievements: Achievement[];
}