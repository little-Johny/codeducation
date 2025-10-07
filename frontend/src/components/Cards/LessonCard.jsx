import { Link } from "react-router-dom";
import { fetchApiData } from "../../hooks/useQuery";
import { useState } from "react";
import { toast } from "react-toastify";
import { Play } from "lucide-react";

export default function LessonCard({ lesson, reload = () => {} }) {
    const [uploading, setUploading] = useState(false);

    const handleDelete = async (id) => {
        const confirm = window.confirm("¿Estás seguro de que quieres eliminar esta lección?");
        if (confirm) {
            await fetchApiData("delete", `/lessons/${id}`);
            if (reload) {
                reload();
            }
        }
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const file = formData.get("file");

        // Validacion
        const allowedTypes = [
            "image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp",
            "video/mp4", "video/quicktime", "video/x-msvideo",
            "application/pdf", "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ];

        if (!allowedTypes.includes(file.type)) {
            toast.error("Tipo de archivo no permitido. Solo se permiten imágenes, videos, PDFs y documentos de Office.");
            return;
        }

        setUploading(true);
        try {
            const uploadFormData = new FormData();
            uploadFormData.append("file", file);

            const response = await fetchApiData("post", `/files/lesson/${lesson.id}`, uploadFormData, true);
            if (response?.success) {
                document.getElementById(`upload_modal_${lesson.id}`).close();
                if (reload) reload();
            } else {
                toast.error("Error al subir el archivo");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("Error al subir el archivo");
        } finally {
            setUploading(false);
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
                            <Play fill="bg-neutral"/>
                        </Link>
                        <button
                            className="btn btn-secondary"
                            onClick={() => document.getElementById(`upload_modal_${lesson.id}`).showModal()}
                        >
                            Adjuntar archivo
                        </button>
                        <button className="btn btn-error" onClick={() => handleDelete(lesson.id)}>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal para subir archivo */}
            <dialog id={`upload_modal_${lesson.id}`} className="modal">
                <div className="modal-box">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => document.getElementById(`upload_modal_${lesson.id}`).close()}
                    >
                        ✕
                    </button>
                    <h3 className="font-bold text-lg">Adjuntar archivo a {lesson.name}</h3>
                    <form onSubmit={handleFileUpload} className="mt-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Seleccionar archivo</span>
                            </label>
                            <input
                                type="file"
                                name="file"
                                className="file-input file-input-bordered file-input-primary w-full"
                                accept=".jpg,.jpeg,.png,.gif,.webp,.mp4,.mov,.avi,.pdf,.doc,.docx,.xls,.xlsx"
                                required
                            />
                            <div className="label">
                                <span className="label-text-alt text-gray-500">
                                    Tipos permitidos: Imágenes, videos, PDFs, documentos de Office. Máximo 5MB.
                                </span>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn"
                                onClick={() => document.getElementById(`upload_modal_${lesson.id}`).close()}
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={uploading}>
                                {uploading ? "Subiendo..." : "Subir archivo"}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}
