import { Link } from "react-router-dom";
import { fetchApiData } from "../../hooks/useQuery";

export default function LessonCard({ lesson, reload = () => {} }) {
    const handleDelete = async (id) => {
        const confirm = window.confirm("¿Estás seguro de que quieres eliminar esta lección?");
        if (confirm) {
            await fetchApiData("delete", `/lessons/${id}`);
            if (reload) {
                reload();
            }
        }
    };
    return (
        <div className="flex bg-base-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ">
            {/* Video o imagen previa */}
            <div className="relative flex-1/3 h-48 bg-gray-200 overflow-hidden">
                {lesson.videoUrl ? (
                    <video src={lesson.videoUrl.trim()} className="w-full h-full object-cover" />
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
            <div className=" flex-2/3 p-4 flex flex-col gap-2">
                <h3 className="text-lg font-bold text-base-content line-clamp-1">{lesson.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                    {lesson.description || "Sin descripción"}
                </p>

                {/* Fecha de creación */}
                <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                    <span>
                        Creada:
                        {new Date(lesson.created_at).toLocaleDateString("es-CO", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                    <div className="flex flex-col gap-2">
                        <Link
                            to={`/lesson/${lesson.id}`}
                            className="btn btn-info text-base-content"
                        >
                            Ver
                        </Link>
                        <button className="btn btn-error" onClick={() => handleDelete(lesson.id)}>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
