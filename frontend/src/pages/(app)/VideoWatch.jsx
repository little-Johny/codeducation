import { useEffect, useState } from "react";
import { Heart, Download, FileText, Image, Video, File } from "lucide-react";
import { useParams } from "react-router-dom";
import { fetchApiData, useGetData } from "../../hooks/useQuery";
import LoadingComponent from "../../components/LoadingComponent";
import VideoPlayer from "../../components/VideoPlayer";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function VideoWatch() {
    const { id } = useParams();
    const { session } = useAuth();
    const [like, setLike] = useState(null);
    const {
        data: likeStatus,
        loading: likeStatusLoading,
        reload: likeStatusReload,
    } = useGetData(session?.id && id ? `/likes/check/${session.id}/${id}` : null);

    useEffect(() => {
        if (!likeStatusLoading && likeStatus !== null && likeStatus !== undefined)
            setLike(likeStatus.hasLiked);
    }, [likeStatus, likeStatusLoading]);

    const { data: lesson, loading: lessonLoading } = useGetData(`/lessons/${id}`);

    const { data: courseLessons, loading: courseLoading } = useGetData(
        lesson ? `/lessons/course/${lesson.courseId}` : null
    );

    const { data: lessonFiles, loading: filesLoading } = useGetData(`/files/lesson/${id}`);

    const toggleLike = async (e) => {
        e.preventDefault();

        const data = { lessonId: lesson.id, userId: session.id };

        const response = await fetchApiData("post", `/likes/toggle`, data, false);
        console.log(response);
        console.log(like);
        if (response?.success) {
            setLike(response?.data?.liked);
            likeStatusReload();
            return;
        }
    };

    const handleDownload = async (fileId, filename) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/files/${fileId}/download`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${session?.token}`,
                    },
                }
            );

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                toast.success("Documento descargado exitosamente");
            } else {
                toast.error("Error al descargar el archivo");
            }
        } catch (error) {
            console.error("Error downloading file:", error);
            toast.error("Error al descargar el archivo");
        }
    };

    const getFileIcon = (type) => {
        if (type.startsWith("image/")) return <Image size={20} />;
        if (type.startsWith("video/")) return <Video size={20} />;
        if (type === "application/pdf") return <FileText size={20} />;
        return <File size={20} />;
    };

    if (lessonLoading || courseLoading) {
        return <LoadingComponent size={100} />;
    }

    if (!lesson) {
        return <div>Lección no encontrada</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row gap-4 p-4">
            <div className="flex-1">
                <VideoPlayer lesson={lesson} />
                {/* Below video: title, description, like/dislike, etc. */}
                <div className="mt-4">
                    <div className="flex flex-row items-start justify-between">
                        <div className="flex flex-col flex-1">
                            <h1 className="text-2xl font-bold">{lesson.name}</h1>
                            <p className="text-gray-600 mt-2">{lesson.description}</p>
                        </div>
                        {/* Like/Dislike buttons */}
                        <div className="flex gap-4 my-4">
                            <button
                                onClick={toggleLike}
                                className="flex flex-row gap-2 hover:cursor-pointer hover:scale-105 transition-transform duration-300"
                            >
                                <Heart fill={like ? "white" : "none"} />
                            </button>
                        </div>
                    </div>

                    {/* Archivos adjuntos */}
                    {lessonFiles && lessonFiles.length > 0 && (
                        <div className="mt-6 overflow-hidden">
                            <h3 className="text-lg font-semibold mb-3">Archivos adjuntos</h3>
                            <div className="space-y-2">
                                {lessonFiles.map((file) => (
                                    <div
                                        key={file.id}
                                        className="flex items-center justify-between bg-base-200 p-3 rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            {getFileIcon(file.type)}
                                            <span className="font-medium">{file.filename}</span>
                                        </div>
                                        <button
                                            onClick={() => handleDownload(file.id, file.filename)}
                                            className="btn btn-sm btn-outline btn-primary"
                                        >
                                            <Download size={16} />
                                            Descargar
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Sidebar lessons={courseLessons || []} currentLessonId={id} />
        </div>
    );
}
