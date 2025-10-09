import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

import { getCategory } from "../../utils/getCategories";
import { useAuth } from "../../hooks/useAuth";
import { fetchApiData, useGetData } from "../../hooks/useQuery";
import { useEffect, useState } from "react";

export default function CourseCard({ course }) {
    const { session } = useAuth();
    const [isFavorite, setIsFavorite] = useState(null);
    const category = getCategory(course.category);
    const {
        data: favorite,
        loadin: favoriteLoading,
        reload: favoriteReload,
    } = useGetData(`/favorites/check/${session.id}/${course.id}`);

    useEffect(() => {
        if (!favoriteLoading && favorite !== null && favorite !== undefined) {
            setIsFavorite(favorite.isFavorite);
        }
    }, [favorite]);

    const handleFavoriteCourse = async (courseId, userId) => {
        await fetchApiData("post", `/favorites/toggle`, { courseId, userId }, true);
        favoriteReload();
    };

    return (
        <div className="transition-transform duration-300 hover:scale-105 rounded-lg h-full w-full">
            <div className="card bg-base-300 shadow-md h-full p-6">
                {/* Imagen con tamaño controlado */}
                <figure className="w-full h-40 overflow-hidden">
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                    />
                </figure>

                {/* Contenido */}
                <div className="m-0 p-0 card-body flex flex-col justify-between">
                    <div>
                        <h2 className="card-title line-clamp-2">{course.title}</h2>
                        <p className="line-clamp-3">{course.description}</p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <div
                            className="badge capitalize text-white"
                            style={{ backgroundColor: category?.color || "#9CA3AF" }}
                        >
                            {category?.name || course.category}
                        </div>
                        <button
                            onClick={() => handleFavoriteCourse(course.id, session.id)}
                            className="flex flex-row gap-2 hover:cursor-pointer hover:scale-105 transition-transform duration-300"
                        >
                            <Heart fill={isFavorite ? "white" : "none"} />
                        </button>
                        <Link
                            to={`/courses-details/${course.id}`}
                            className="btn btn-primary btn-sm"
                        >
                            Ver
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
