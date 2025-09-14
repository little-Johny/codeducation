import { createContext, useState, useEffect } from "react";
import { useApiMutation, useApiQuery } from "../hooks/useApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Mutation para login
    const loginMutation = useApiMutation("post", {
        notify: false,
        onSuccess: (data) => {
            if (data.success && data.data.token) {
                localStorage.setItem("auth_token", data.data.token);
                setUser(data.data.user);
                setIsAuthenticated(true);
            }
        },
        onError: (error) => {
            console.error("Login error:", error);
        },
    });

    // Query para verificar sesión
    const { data: sessionData, isLoading } = useApiQuery(
        ["session"],
        "/auth/session",
        {
            enabled: !!localStorage.getItem("auth_token") && !user,
            notify: false,
        }
    );

    useEffect(() => {
        if (sessionData?.success) {
            setUser(sessionData.data);
            setIsAuthenticated(true);
        }
        setLoading(isLoading);
    }, [sessionData, isLoading]);

    const login = async (email, password) => {
        const result = await loginMutation.mutateAsync({
            url: "/auth/login",
            data: { email, password },
        });
        return result;
    };

    const logout = () => {
        localStorage.removeItem("auth_token");
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };