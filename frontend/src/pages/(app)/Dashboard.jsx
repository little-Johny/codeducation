import ThemeToggle from "../../components/ThemeToggle";

export default function Dashboard() {
    return (
        <div className="min-h-full w-full bg-base-300 p-4">
            <div className="flex flex-col flex-1 max-w-6xl h-full mx-auto bg-base-100 rounded-lg shadow-xl p-4 md:p-6">
                {/* Encabezado */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <p className="text-sm text-base-content/70">
                            Resumen general de tu actividad
                        </p>
                        <ThemeToggle />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="btn btn-outline">Exportar</button>
                        <button className="btn btn-primary">Nueva lección</button>
                    </div>
                </div>

                {/* Tarjetas de estadísticas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="stats shadow bg-base-100">
                        <div className="stat">
                            <div className="stat-title">Cursos</div>
                            <div className="stat-value text-primary">12</div>
                            <div className="stat-desc">+2 este mes</div>
                        </div>
                    </div>
                    <div className="stats shadow bg-base-100">
                        <div className="stat">
                            <div className="stat-title">Lecciones</div>
                            <div className="stat-value text-secondary">48</div>
                            <div className="stat-desc">+6 esta semana</div>
                        </div>
                    </div>
                    <div className="stats shadow bg-base-100">
                        <div className="stat">
                            <div className="stat-title">Progreso</div>
                            <div className="stat-value text-accent">72%</div>
                            <div className="stat-desc">3 cursos en progreso</div>
                        </div>
                    </div>
                    <div className="stats shadow bg-base-100">
                        <div className="stat">
                            <div className="stat-title">Favoritos</div>
                            <div className="stat-value">9</div>
                            <div className="stat-desc">2 nuevos</div>
                        </div>
                    </div>
                </div>

                {/* Contenido principal dividido */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Actividad reciente */}
                    <div className="col-span-2 bg-base-100 rounded-lg border border-base-200">
                        <div className="p-4 border-b border-base-200 flex items-center justify-between">
                            <h2 className="font-semibold">Actividad reciente</h2>
                            <button className="btn btn-xs btn-outline">Ver todo</button>
                        </div>
                        <ul className="menu p-2">
                            <li>
                                <a className="hover:bg-base-200">
                                    <span className="badge badge-primary badge-xs mr-2"></span>
                                    Terminaste "React Básico"
                                    <span className="ml-auto text-xs text-base-content/70">
                                        hace 2h
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a className="hover:bg-base-200">
                                    <span className="badge badge-secondary badge-xs mr-2"></span>
                                    Nueva lección "Hooks Avanzados"
                                    <span className="ml-auto text-xs text-base-content/70">
                                        ayer
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a className="hover:bg-base-200">
                                    <span className="badge badge-accent badge-xs mr-2"></span>
                                    Subiste "Buenas prácticas Node.js"
                                    <span className="ml-auto text-xs text-base-content/70">
                                        hace 3d
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Sugerencias / Próximos pasos */}
                    <div className="bg-base-100 rounded-lg border border-base-200">
                        <div className="p-4 border-b border-base-200">
                            <h2 className="font-semibold">Próximos pasos</h2>
                        </div>
                        <div className="p-4 space-y-3">
                            <div className="alert alert-info">
                                <span>Continúa con "Patrones de Diseño" (35% completado).</span>
                            </div>
                            <div className="alert alert-success">
                                <span>¡Felicidades! Completaste 2 cursos esta semana.</span>
                            </div>
                            <div className="alert">
                                <span>
                                    Configura tus notificaciones para no perderte novedades.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
