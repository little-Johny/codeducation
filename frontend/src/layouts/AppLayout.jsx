import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
    House,
    BookOpen,
    BarChart3,
    Settings,
    PanelRightOpen,
    PanelRightClose,
    ChevronLeft,
    ChevronRight,
    ArrowBigLeft,
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../hooks/useAuth";

export default function AppLayout() {
    const [leftCollapsed, setLeftCollapsed] = useState(
        () => localStorage.getItem("leftCollapse") === "true"
    );
    const [rightCollapsed, setRightCollapsed] = useState(
        () => localStorage.getItem("rightCollapse") === "true"
    );

    const { session, logout, reload } = useAuth();

    useEffect(() => {
        localStorage.setItem("leftCollapse", leftCollapsed);
    }, [leftCollapsed]);

    useEffect(() => {
        localStorage.setItem("rightCollapse", rightCollapsed);
    }, [rightCollapsed]);

    // Helper function para clases de transición de texto
    const getTextTransitionClasses = (collapsed) =>
        `overflow-hidden whitespace-nowrap transition-all duration-300 ${
            collapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-xs"
        }`;

    // Helper function para clases de botón de colapso
    const getCollapseButtonClasses = () =>
        "btn btn-ghost btn-sm p-2 justify-center hover:bg-base-300 rounded-lg transition-colors";

    // Helper function para clases de elementos del menú
    const getMenuItemClasses = (collapsed) =>
        `flex items-center p-2 rounded-lg hover:bg-base-300 transition-colors ${
            collapsed ? "justify-center gap-0 px-2 tooltip tooltip-right" : "gap-3"
        }`;

    return (
        <div className="w-full min-h-screen flex flex-1 bg-base-100">
            {/* Sidebar izquierdo */}
            <div
                className={`flex flex-col  ${
                    leftCollapsed ? "w-16" : "w-60 drop-shadow-xl"
                } bg-base-100 transition-all duration-300 ease-in-out gap-4`}
            >
                {/* Header del sidebar izquierdo */}
                <div
                    className={`flex items-center justify-between p-4 ${
                        leftCollapsed ? "justify-center" : ""
                    }`}
                >
                    {!leftCollapsed && <h2 className="font-bold text-lg">SIIP</h2>}
                    <div className="flex items-center gap-2">
                        {!leftCollapsed && <ThemeToggle />}
                        <button
                            onClick={() => setLeftCollapsed(!leftCollapsed)}
                            className={getCollapseButtonClasses()}
                            title={leftCollapsed ? "Expandir menú" : "Colapsar menú"}
                        >
                            {leftCollapsed ? (
                                <PanelRightClose className="w-5 h-5" />
                            ) : (
                                <PanelRightOpen className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
                <ul
                    className={`menu flex-1 flex flex-col space-y-1 w-full ${
                        leftCollapsed ? "px-1" : "px-2"
                    }`}
                >
                    <li>
                        <Link
                            to="/dashboard"
                            className={`${getMenuItemClasses(leftCollapsed)} cursor-pointer `}
                            data-tip="Inicio"
                        >
                            <House className="w-5 h-5 flex-shrink-0" />
                            <span className={getTextTransitionClasses(leftCollapsed)}>Inicio</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/courses"
                            className={getMenuItemClasses(leftCollapsed)}
                            data-tip="Cursos"
                        >
                            <BookOpen className="w-5 h-5 flex-shrink-0" />
                            <span className={getTextTransitionClasses(leftCollapsed)}>Cursos</span>
                        </Link>
                    </li>
                    <li>
                        <a className={getMenuItemClasses(leftCollapsed)} data-tip="Estadísticas">
                            <BarChart3 className="w-5 h-5 flex-shrink-0" />
                            <span className={getTextTransitionClasses(leftCollapsed)}>
                                Estadísticas
                            </span>
                        </a>
                    </li>
                    <li className="">
                        <a className={getMenuItemClasses(leftCollapsed)} data-tip="Configuración">
                            <Settings className="w-5 h-5 flex-shrink-0" />
                            <span className={getTextTransitionClasses(leftCollapsed)}>
                                Configuración
                            </span>
                        </a>
                    </li>
                </ul>
            </div>

            {/* Contenido central */}
            <div className="flex-1 p-4 md:p-6 bg-base-300 overflow-y-auto min-h-0">
                <div className="max-w-full h-full flex flex-col mx-auto bg-base-100 rounded-lg shadow-xl p-4 md:p-6">
                    {/* Botón de retroceso */}
                    <button
                        className="btn btn-ghost btn-circle mb-4"
                        onClick={() => window.history.back()}
                        title="Volver"
                    >
                        <ArrowBigLeft size={28} />
                    </button>

                    {/* Contenido dinámico */}
                    <div className="flex-1">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Sidebar derecho */}
            <div
                className={`flex flex-col bg-base-100  transition-all duration-300 ease-in-out ${
                    rightCollapsed ? "w-16" : "w-72 shadow-xl"
                }`}
            >
                {/* Header del sidebar derecho */}
                <div
                    className={`flex items-center justify-between p-4 ${
                        rightCollapsed ? "justify-center" : ""
                    }`}
                >
                    {!rightCollapsed && <h3 className="font-bold text-lg">Panel Lateral</h3>}
                    <button
                        onClick={() => setRightCollapsed(!rightCollapsed)}
                        className={getCollapseButtonClasses()}
                        title={rightCollapsed ? "Expandir panel" : "Colapsar panel"}
                    >
                        {rightCollapsed ? (
                            <ChevronLeft className="w-5 h-5" />
                        ) : (
                            <ChevronRight className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {/* Contenido del sidebar */}
                <div className={`flex-1 px-4 pb-4 ${rightCollapsed ? "hidden" : "block"}`}>
                    {/* Seccion de Perfil */}
                    <div className="dropdown dropdown-left mb-6 bg-base-100 p-2 rounded-lg shadow-sm hover:scale-105 transition-all duration-200 hover:shadow-lg cursor-pointer">
                        <div
                            className="flex flex-col md:flex-row items-center gap-3 tooltip tooltip-bottom"
                            data-tip="ver perfil"
                            tabIndex={0}
                        >
                            <div className="avatar avatar-placeholder">
                                <div className="bg-neutral-content text-neutral-content rounded-full w-13">
                                    <span className="text-neutral">{}</span>
                                </div>
                            </div>
                            <div className="grow flex items-center w-full min-w-0">
                                <div className="grow min-w-0 flex flex-col">
                                    <span className="text-sm font-bold">
                                        {" "}
                                        {session?.name || "Usuario"}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {session?.role || "usuario"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm"
                        >
                            <li>
                                <a>Ver perfil</a>
                            </li>
                            <li
                                className="hover:text-red-500"
                                onClick={() => {
                                    logout();
                                    reload();
                                }}
                            >
                                <a>Cerrar sesion</a>
                            </li>
                        </ul>
                    </div>

                    {/* Sección de Estadísticas */}
                    <div className="mb-6">
                        <h3 className="font-bold mb-3 text-base">Estadísticas</h3>
                        <div className="stats shadow w-full">
                            <div className="stat p-4">
                                <div className="stat-title text-xs">Cursos Completados</div>
                                <div className="stat-value text-2xl">12</div>
                                <div className="stat-desc text-xs">+2 este mes</div>
                            </div>
                        </div>
                    </div>

                    {/* Sección de Notificaciones */}
                    <div>
                        <h3 className="font-bold mb-3 text-base">Notificaciones</h3>
                        <ul className="menu bg-base-100 rounded-box shadow-sm">
                            <li>
                                <a className="text-sm hover:bg-base-200 transition-colors">
                                    <span className="badge badge-primary badge-xs mr-2"></span>
                                    Nuevo curso disponible
                                </a>
                            </li>
                            <li>
                                <a className="text-sm hover:bg-base-200 transition-colors">
                                    <span className="badge badge-secondary badge-xs mr-2"></span>
                                    Recordatorio de clase
                                </a>
                            </li>
                            <li>
                                <a className="text-sm hover:bg-base-200 transition-colors">
                                    <span className="badge badge-accent badge-xs mr-2"></span>
                                    Progreso actualizado
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Indicador de colapso */}
                {rightCollapsed && (
                    <div className="flex flex-col items-center space-y-4 p-2">
                        <div className="tooltip tooltip-left" data-tip="Estadísticas">
                            <BarChart3 className="w-6 h-6 text-base-content/70" />
                        </div>
                        <div className="tooltip tooltip-left" data-tip="Notificaciones">
                            <div className="relative">
                                <Settings className="w-6 h-6 text-base-content/70" />
                                <span className="absolute -top-1 -right-1 badge badge-primary badge-xs">
                                    3
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
