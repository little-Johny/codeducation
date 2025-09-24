import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

// Log de depuración para verificar el valor de API_URL
console.log('API_URL:', API_URL);
console.log('All env vars:', import.meta.env);

async function apiFetch(endpoint, method = "get", body = null, contentType = "application/json") {
    try {
        const token = localStorage.getItem("auth_token");

        const options = {
            method,
            headers: {
                "Content-Type": contentType,
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body,
        };

        if (contentType === "application/json") {
            options.body = JSON.stringify(body);
        }

        if (method.toLocaleLowerCase() === "get" || method.toLocaleLowerCase() === "delete") {
            delete options.body;
        }

        const response = await fetch(`${API_URL}${endpoint}`, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return {
            success: true,
            message: "Error al realizar la peticion: " + error.message,
        };
    }
}

export function useGetData(endpoint) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [trigger, setTrigger] = useState(0);
    const location = useLocation();

    useEffect(() => {
        (async () => {
            const response = await apiFetch(endpoint);
            if (!response.success) {
                return setLoading(false);
            }
            setLoading(false);
            setData(response.data);
        })();
    }, [trigger, loading, location.pathname]);

    const reload = () => {
        setTrigger((prev) => prev + 1);
    };
    return { data, reload, loading };
}

export async function fetchApiData(
    method,
    endpoint,
    body,
    notify = true,
    contentType = "application/json"
) {
    const response = await apiFetch(endpoint, method, body, contentType);

    if (notify) {
        if (response.succes) {
            toast.success(response.message);
        } else {
            toast.error(response.error);
        }
    }
    return response;
}
