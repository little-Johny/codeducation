import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [state, setState] = useState("unauthorized");

    useEffect(() => {
        const storedToken = localStorage.getItem("auth_token");
        if (storedToken) {
            setToken(storedToken);
            setState("authorized");
        } else {
            setState("unauthorized");
        }
    }, []);

    const login = (newToken) => {
        localStorage.setItem("auth_token", newToken);
        setToken(newToken);
        setState("authorized");
    };

    const logout = () => {
        localStorage.removeItem("auth_token");
        setToken(null);
        setState("unauthorized");
        navigate("/");
    };

    const value = {
        login,
        logout,
        token,
        state,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
