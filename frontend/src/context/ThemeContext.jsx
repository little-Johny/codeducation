import { createContext, useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import apiClient from "../lib/apiClient"; // Importa apiClient en lugar de useApi

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const { user } = useAuth();

    // Maneja el caso donde user es null: usa optional chaining y un tema por defecto
    const userTheme = user?.theme ? "light" : "dark"; // Simplificado, sin el || redundante

    const [theme, setTheme] = useState(userTheme);

    useEffect(() => {
        const $root = document.documentElement;
        $root.setAttribute("data-theme", userTheme);
        localStorage.setItem("theme", userTheme);
    }, [userTheme]);

    const toggleTheme = async () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        try {
            // Usa apiClient en lugar de useApi (que no está definido)
            await apiClient.patch(`users/${user.id}`, { theme: newTheme === "light" }); 
        } catch (error) {
            console.error("Error al actualizar tema:", error);
            setTheme(theme); // Revertir al tema anterior si falla
        }
    };

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export { ThemeContext };
