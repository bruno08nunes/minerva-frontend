import { Theme } from "@/types/theme";
import { env } from "../env";

interface ThemesListReponse {
    success: boolean;
    message: string;
    data: Theme[];
}

export async function listThemes() {
    try {
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/themes`);
        const { data, message, success }: ThemesListReponse = await response.json();

        if (!success) {
            return { success: false, message: "Erro ao listar temas. Tente novamente mais tarde!" };
        }

        return { themesData: data, message, success };
    } catch {
        return { success: false, message: "Erro ao listar temas. Tente novamente mais tarde!" };
    }
}

interface ThemeReponse {
    success: boolean;
    message: string;
    data: Theme;
}

export async function getThemeBySlug(themeSlug: string) {
    try {
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/themes/${themeSlug}`);
        const { data, message, success }: ThemeReponse = await response.json();

        if (!success) {
            return { success: false, message: "Erro ao selecionar tema. Tente novamente mais tarde!" };
        }

        return { theme: data, message, success };
    } catch {
        return { success: false, message: "Erro ao selecionar tema. Tente novamente mais tarde!" };
    }
}