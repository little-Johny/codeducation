import { useState } from "react";
import { Heart } from "lucide-react";
import { useParams } from "react-router-dom";
import { fetchApiData, useGetData } from "../../hooks/useQuery";
import LoadingComponent from "../../components/LoadingComponent";
import VideoPlayer from "../../components/VideoPlayer";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../hooks/useAuth";

export default function VideoWatch() {
    const { id } = useParams();
    const { session } = useAuth();
    const [like, setLike] = useState(null);

    const { data: lesson, loading: lessonLoading } = useGetData(`/lessons/${id}`);

    const { data: courseLessons, loading: courseLoading } = useGetData(
        lesson ? `/lessons/course/${lesson.courseId}` : null
    );

    const toggleLike = async (e) => {
        e.preventDefault();

        const data = { lessonId: lesson.id, userId: session.id };

        const response = await fetchApiData("post", `/likes/toggle`, data, false);
        console.log(response);
        if (response?.success) {
            setLike(response?.data?.liked);
            return;
        }
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
                <div className="mt-4 flex flex-row items-center">
                    <div className="flex flex-col">
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
            </div>
            <Sidebar lessons={courseLessons || []} currentLessonId={id} />
        </div>
    );
}
