import { Link } from "react-router-dom";

export default function Sidebar({ lessons, currentLessonId }) {
    return (
        <div className="w-full lg:w-80 bg-base-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Lecciones del Curso</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
                {lessons.map((lesson) => (
                    <Link
                        key={lesson.id}
                        to={`/lesson/${lesson.id}`}
                        className={`block p-3 rounded-lg hover:bg-base-200 transition ${
                            lesson.id === currentLessonId ? "bg-primary text-primary-content" : ""
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                {lesson.videoUrl ? (
                                    <video
                                        src={lesson.videoUrl}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                                        Sin video
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium line-clamp-2">{lesson.name}</h4>
                                <p className="text-xs text-gray-500">
                                    {new Date(lesson.created_at).toLocaleDateString("es-CO")}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}