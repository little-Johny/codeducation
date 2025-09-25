import { useRef, useState } from "react";

import { BookPlus, RefreshCwIcon, Wallpaper } from "lucide-react";

import LoadingComponent from "../../components/LoadingComponent";
import CourseCard from "../../components/CourseCard";

import { useGetData, fetchApiData } from "../../hooks/useQuery";
import { useAuth } from "../../hooks/useAuth";

export default function CoursesManagement() {
    const { session } = useAuth();
    const createModal = useRef(null);
    const uploadModal = useRef(null);

    const [loading, setLoading] = useState(false); // para formularios
    const {
        data: courses,
        loading: loadingCourses,
        reload: reloadCourses,
    } = useGetData("/courses");

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        formData.append("userId", session.id);
        const result = await fetchApiData("post", "/courses", formData, true);

        setLoading(false);

        if (result?.success) {
            createModal.current?.close();
            e.target.reset();
            reloadCourses();
        }
    };

    const handleUploadImage = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const result = await fetchApiData(
            "post",
            `/courses/${formData.get("course_id")}/files`,
            formData,
            true
        );

        setLoading(false);

        if (result?.success) {
            uploadModal.current?.close();
            e.target.reset();
            reloadCourses();
        }
    };

    const toggleModal = (ref, action) => {
        if (action === "close") return ref.current?.close();
        return ref.current?.showModal();
    };

    if (loadingCourses) return <LoadingComponent size={30} />;

    return (
        <div className="mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Cursos Disponibles</h1>

            {/* Botones de acción */}
            <div className="mb-10 flex gap-4">
                <button
                    type="button"
                    className="btn btn-primary tooltip tooltip-top"
                    data-tip="Crear nuevo curso"
                    onClick={() => toggleModal(createModal, "open")}
                >
                    <span className="hidden sm:block">Crear Nuevo Curso</span>
                    <BookPlus className="block sm:hidden" />
                </button>
                <button
                    type="button"
                    className="btn btn-secondary tooltip tooltip-top"
                    data-tip="Agregar portada"
                    onClick={() => toggleModal(uploadModal, "open")}
                >
                    <span className="hidden sm:block">Agregar Portada</span>
                    <Wallpaper className="block sm:hidden" />
                </button>

                <button
                    className="btn btn-success tooltip tooltip-top"
                    data-tip="refrescar"
                    type="button"
                    onClick={() => reloadCourses()}
                >
                    <RefreshCwIcon />
                </button>
            </div>

            {/* Lista de cursos o loader */}
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 space-y-2">
                {courses?.length ? (
                    courses.map((course) => <CourseCard key={course.id} course={course} />)
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No hay cursos disponibles.
                    </p>
                )}
            </div>

            {/* Modal Crear Curso */}
            <dialog ref={createModal} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Crear Nuevo Curso</h3>
                    <form onSubmit={handleCreateCourse}>
                        {/* inputs */}
                        <label className="block mb-2">Título</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            name="title"
                            required
                        />
                        <label className="block mb-2 mt-4">Descripción</label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            name="description"
                            required
                        />
                        <label className="block mb-2 mt-4">Categoría</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            name="category"
                            required
                        />
                        <label className="block mb-2 mt-4">Imagen de Portada (opcional)</label>
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full"
                            accept="image/*"
                            name="image"
                        />

                        {/* acciones */}
                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn"
                                onClick={() => toggleModal(createModal, "close")}
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? <LoadingComponent size={17} text={false} /> : "Crear"}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* Modal Subir Imagen */}
            <dialog ref={uploadModal} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Subir Imagen de Portada</h3>
                    <form onSubmit={handleUploadImage}>
                        <div className="py-4">
                            <label className="block mb-2">Seleccionar Curso</label>
                            <select
                                className="select select-bordered w-full"
                                name="course_id"
                                required
                            >
                                <option value="">Selecciona un curso</option>
                                {courses?.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                            <label className="block mb-2 mt-4">Seleccionar Imagen</label>
                            <input
                                type="file"
                                name="image"
                                className="file-input file-input-bordered w-full"
                                accept="image/*"
                                required
                            />
                        </div>
                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn"
                                onClick={() => toggleModal(uploadModal, "close")}
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? <LoadingComponent size={17} text={false} /> : "Subir"}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}
