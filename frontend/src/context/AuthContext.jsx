import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../lib/apiClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [state, setState] = useState("unauthorized");

    useEffect(() => {
        const storedToken = localStorage.getItem("auth_token");
        if (storedToken) {
            setToken(storedToken);
            // Obtener datos del usuario desde el backend
            fetchUserData(storedToken);
        } else {
            setState("unauthorized");
        }
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await apiClient.get("/auth/session");
            if (response.data.success) {
                setUser(response.data.data);
                setState("authorized");
            } else {
                // Token inválido, limpiar
                localStorage.removeItem("auth_token");
                setToken(null);
                setState("unauthorized");
            }
        } catch (error) {
            // Error al obtener sesión, limpiar
            localStorage.removeItem("auth_token");
            setToken(null);
            setState("unauthorized");
        }
    };

    const login = (newToken, userData) => {
        localStorage.setItem("auth_token", newToken);
        setToken(newToken);
        setUser(userData);
        setState("authorized");
    };

    const logout = () => {
        localStorage.removeItem("auth_token");
        setToken(null);
        setUser(null);
        setState("unauthorized");
        navigate("/");
    };

    const value = {
        login,
        logout,
        token,
        user,
        state,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
