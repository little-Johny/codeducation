import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../lib/apiClient";

async function fetch(method, url, body) {
    try {
        let response;
        if (method === "get" || method === "delete") {
            response = await apiClient[method](url);
        } else {
            response = await apiClient[method](url, body);
        }
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
}

export function useGet(url = null, notify = false) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [trigger, setTrigger] = useState(0);
    const pathname = useLocation().pathname;

    useEffect(() => {
        if (!url) {
            setData(null);
            setLoading(false);
            return;
        }

        (async () => {
            let id;

            if (notify) id = toast("Cargando...", { isLoading: true });

            const response = await fetch("get", url);
            if (response) setLoading(false);

            setData(response);

            if (response && notify && id) {
                const message = response?.message || "Tiempo de espera agotado";

                if (typeof toast.update === 'function') {
                    toast.update(id, {
                        render: message,
                        type: response.success ? "success" : "error",
                        isLoading: false,
                        autoClose: 3000,
                    });
                } else {
                    // Fallback si update no existe
                    toast.dismiss(id);
                    if (response.success) {
                        toast.success(message);
                    } else {
                        toast.error(message);
                    }
                }
            }
        })();
    }, [url, trigger, pathname]);

    const reload = (reset = false) => {
        if (reset) {
            setLoading(true);
        }
        setTrigger((prev) => prev + 1);
    };

    return {
        data: data?.data || null,
        message: data?.message || null,
        loading,
        reload,
    };
}

export async function useApi(
    method = null,
    url = null,
    body = null,
    notify = null,
    headers = null
) {
    if (!method) return;
    let id;

    if (notify) id = toast("Cargando...", { isLoading: true });

    const response = await fetch(method, url, body, headers);

    if (notify && response && id) {
        const message = response?.message || "Operacion exitosa";
        if (typeof toast.update === 'function') {
            toast.update(id, {
                render: message,
                type: response?.success ? "success" : "error",
                isLoading: false,
                autoClose: 3000,
            });
        } else {
            // Fallback si update no existe
            toast.dismiss(id);
            if (response?.success) {
                toast.success(message);
            } else {
                toast.error(message);
            }
        }
    }

    return response;
}
