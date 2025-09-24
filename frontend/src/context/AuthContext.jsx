import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetData } from "../hooks/useQuery";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [state, setState] = useState("unauthorized");

    const {
        data: session,
        reload: relaodSession,
        loading: loadingSession,
    } = useGetData("/auth/session");

    useEffect(() => {
        const storedToken = localStorage.getItem("auth_token");

        if (!storedToken) return setState("unauthenticated");
        if (!token) return setToken(storedToken);

        if (loadingSession) return setState("loading");
        if (session) return setState("authenticated");
        else if (!session && !loadingSession) return setState("unauthenticated");
        return setState("loading");
    }, [loadingSession, session]);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem("auth_token", newToken);
    };

    const logout = () => {
        localStorage.removeItem("auth_token");
        setToken(null);
        setState("unauthorized");
    };

    const value = {
        login,
        logout,
        token,
        session,
        reload: (reset = false) => {
            relaodSession(reset);
        },
        state,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
