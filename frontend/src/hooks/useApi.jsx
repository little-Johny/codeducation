import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { apiCall } from "../lib/apiClient";

// Hook para consultas GET
export const useApiQuery = (key, url, options = {}) => {
    const { notify = false, enabled = true } = options;

    return useQuery({
        queryKey: key,
        queryFn: () => apiCall("get", url),
        enabled,
        onSuccess: (data) => {
            if (notify && data.success) {
                toast.success(data.data?.message || "Datos cargados exitosamente");
            }
        },
        onError: (error) => {
            if (notify) {
                toast.error(error?.message || "Error al cargar datos");
            }
        },
    });
};

// Hook para mutaciones (POST, PUT, DELETE)
export const useApiMutation = (method, options = {}) => {
    const { notify = true, onSuccess, onError } = options;
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ url, data }) => apiCall(method, url, data),
        onSuccess: (data, variables) => {
            if (notify && data.success) {
                toast.success(data.data?.message || "Operación exitosa");
            }
            if (onSuccess) onSuccess(data, variables);
            // Invalidar queries relacionadas si es necesario
            queryClient.invalidateQueries();
        },
        onError: (error, variables) => {
            if (notify) {
                toast.error(error?.message || "Error en la operación");
            }
            if (onError) onError(error, variables);
        },
    });
};

// Función auxiliar para llamadas directas (no hook)
export const apiRequest = async (method, url, data = null, config = {}) => {
    return await apiCall(method, url, data, config);
};
