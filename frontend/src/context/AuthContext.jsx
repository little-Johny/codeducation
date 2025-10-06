import { createContext, useState, useEffect } from "react";
import { useGetData } from "../hooks/useQuery";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("auth_token"));
    const [state, setState] = useState("loading");

    const {
        data: session,
        reload: reloadSession,
        loading: loadingSession,
    } = useGetData("/auth/session");

    useEffect(() => {
        const storedToken = localStorage.getItem("auth_token");

        // Si no hay token → no autenticado
        if (!storedToken) {
            setState("unauthenticated");
            return;
        }

        // Si hay token pero todavía se está cargando la sesión
        if (loadingSession) {
            setState("loading");
            return;
        }

        // Si la sesión está lista
        if (session) {
            setState("authenticated");
        } else {
            setState("unauthenticated");
        }
    }, [loadingSession, session]);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem("auth_token", newToken);
        setState("authenticated");
    };

    const logout = () => {
        localStorage.removeItem("auth_token");
        setToken(null);
        setState("unauthenticated");
    };

    const value = {
        token,
        session,
        state,
        login,
        logout,
        reload: (reset = false) => reloadSession(reset),
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
