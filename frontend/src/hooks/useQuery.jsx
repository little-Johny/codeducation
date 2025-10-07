import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

async function apiFetch(endpoint, method = "get", body = null) {
    try {
        const token = localStorage.getItem("auth_token");

        const options = {
            method,
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        if (body instanceof FormData) {
            // No seteamos Content-Type, el navegador lo hace
            options.body = body;
        } else if (body) {
            options.headers["Content-Type"] = "application/json";
            options.body = JSON.stringify(body);
        }

        if (["get", "delete"].includes(method.toLowerCase())) {
            delete options.body;
        }

        const response = await fetch(`${API_URL}${endpoint}`, options);
        return await response.json();
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Error al realizar la petición: " + error.message,
        };
    }
}

export function useGetData(endpoint) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        (async () => {
            if (!endpoint) return;
            const response = await apiFetch(endpoint);

            if (response?.success) setData(response.data);

            setLoading(false);
        })();
    }, [trigger, loading, endpoint]);

    const reload = () => {
        setTrigger((prev) => prev + 1);
    };
    return { data, reload, loading };
}

export async function fetchApiData(method, endpoint, body = null, notify = true) {
    const response = await apiFetch(endpoint, method, body);

    if (notify) {
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.error);
        }
    }
    return response;
}
