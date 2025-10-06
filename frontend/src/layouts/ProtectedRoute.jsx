import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import LoadingComponent from "../components/LoadingComponent";

export default function ProtectedRoute({ mustBeAuth = true }) {
    const { session, state } = useAuth();

    if (state === "loading") {
        return <LoadingComponent size={200} />;
    }

    if (
        (mustBeAuth && state !== "authenticated") ||
        (state === "authenticated" && !session && mustBeAuth)
    ) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
