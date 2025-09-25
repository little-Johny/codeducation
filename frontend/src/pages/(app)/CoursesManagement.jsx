import React, { useState } from "react";
import { useGetData, fetchApiData } from "../../hooks/useQuery";
import CourseCard from "../../components/CourseCard";

export default function CoursesManagement() {
    const {
        data: courses,
        loading: loadingCourses,
        reload: reloadCourses,
    } = useGetData("/courses");
    const [modalCreateOpen, setModalCreateOpen] = useState(false);
    const [modalUploadOpen, setModalUploadOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);

        const result = await fetchApiData("post", "/courses", formData, true);

        setLoading(false);

        if (result?.success) {
            setModalCreateOpen(false);
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
        if (result?.success) {
            setModalUploadOpen(false);
            setLoading(false);
            e.target.reset();
            reloadCourses();
        }
    };

    if (loadingCourses) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Cursos Disponibles</h1>
            <div className="mb-4 flex gap-4">
                <button className="btn btn-primary" onClick={() => setModalCreateOpen(true)}>
                    Crear Nuevo Curso
                </button>
                <button className="btn btn-secondary" onClick={() => setModalUploadOpen(true)}>
                    Subir Imagen de Portada
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {courses?.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>

            {/* Modal Crear Curso */}
            <dialog open={modalCreateOpen} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Crear Nuevo Curso</h3>
                    <form onSubmit={handleCreateCourse}>
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
                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn"
                                onClick={() => setModalCreateOpen(false)}
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    "Crear"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* Modal Subir Imagen */}
            <dialog open={modalUploadOpen} className="modal">
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
                                onClick={() => setModalUploadOpen(false)}
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    "Subir"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}
