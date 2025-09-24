import { createContext, useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { fetchApiData } from "../hooks/useQuery";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const { session, reload } = useAuth();
    const userTheme = session?.theme || localStorage.getItem("theme") || "light";

    const [theme, setTheme] = useState(userTheme);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Sincronizar tema con DOM y localStorage
    useEffect(() => {
        const $root = document.documentElement;
        $root.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = async () => {
        if (loading) return;

        const newTheme = theme === "light" ? "dark" : "light";
        const previousTheme = theme;

        setTheme(newTheme);
        setLoading(true);
        setError(null);

        try {
            if (session?.id) {
                const response = await fetchApiData(
                    "PATCH",
                    `/users/${session.id}`,
                    { theme: newTheme === "dark" }, // true si dark, false si light
                    false
                );

                if (!response.success) {
                    throw new Error(response.error || "Error al actualizar tema");
                }

                reload();
            }
        } catch (error) {
            console.error("Error al actualizar tema:", error);
            setTheme(previousTheme); // revertir si falla
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, loading, error }}>
            {children}
        </ThemeContext.Provider>
    );
}

export { ThemeContext };
