import { useParams } from "react-router-dom";
import { fetchApiData, useGetData } from "../../hooks/useQuery";
import LoadingComponent from "../../components/LoadingComponent";
import LessonCard from "../../components/Cards/LessonCard";
import LessonForm from "../../components/Forms/LessonForm";

export default function CourseLessons() {
    const { id } = useParams();

    const {
        data: course,
        loading: courseLoading,
        reload: courseReload,
    } = useGetData(`/courses/${id}`);

    const handleCreate = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append("courseId", course.id);
        console.log("DEBUG: formData entries:", Array.from(formData.entries()));
        const data = Object.fromEntries(formData.entries());
        console.log("DEBUG: data object:", data);
        console.log("DEBUG: data with courseId:", data);
        const response = await fetchApiData("post", "/lessons", formData);
        console.log(response);
        if (response?.success) {
            courseReload();
        }
        document.getElementById("create_lesson_modal").close();
    };

    if (courseLoading) {
        return <LoadingComponent size={100} />;
    }

    return (
        <div className="flex flex-col flex-1 space-y-2">
            <div
                className="relative w-full h-[50%] bg-cover bg-center flex overflow-hidden hover:scale-101 hover:transition-all hover:duration-300 rounded-lg"
                style={{ backgroundImage: `url(${course.image})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center px-4 w-full">
                    <h1 className="text-3xl font-bold mt-4 text-white">{course.title}</h1>
                    <button
                        onClick={() => document.getElementById("create_lesson_modal").show()}
                        className="btn btn-primary mt-4"
                    >
                        + Agregar lección
                    </button>
                </div>
            </div>
            <div className="w-full bg-base-100">
                <h2 className="text-xl font-semibold">Lecciones</h2>
                <div className="divider mt-0"></div>
                <div className="space-y-4">
                    {course.lessons.length > 0 ? (
                        course.lessons.map((l) => <LessonCard lesson={l} reload={courseReload} />)
                    ) : (
                        <div>Este curso aun no tiene lecciones para ver</div>
                    )}
                </div>
            </div>
            <dialog id="create_lesson_modal" className="modal">
                <div className="modal-box">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => document.getElementById("create_lesson_modal").close()}
                    >
                        ✕
                    </button>
                    <LessonForm onSubmit={handleCreate} />
                </div>
            </dialog>
        </div>
    );
}
