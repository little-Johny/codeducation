export default function LessonCard({ lesson }) {
    return (
        <div className="bg-base-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200">
            {/* Video o imagen previa */}
            <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                {lesson.videoUrl ? (
                    <video
                        src={lesson.videoUrl.trim()}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        autoPlay
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Sin video
                    </div>
                )}
                <div className="absolute inset-0 bg-black/30" />
                <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-lg">
                    Lección
                </span>
            </div>

            {/* Contenido */}
            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{lesson.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                    {lesson.description || "Sin descripción"}
                </p>

                {/* Fecha de creación */}
                <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                    <span>
                        Creada:{" "}
                        {new Date(lesson.created_at).toLocaleDateString("es-CO", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                    <button className="text-primary hover:underline">Ver más</button>
                </div>
            </div>
        </div>
    );
}
