import { useRef, useState } from "react";

import { BookPlus, BookOpenCheck, RefreshCwIcon, Wallpaper, FileType } from "lucide-react";

import LoadingComponent from "../../components/LoadingComponent";
import CourseCard from "../../components/Cards/CourseCard";

import { useGetData, fetchApiData } from "../../hooks/useQuery";
import { useAuth } from "../../hooks/useAuth";
import { COURSE_CATEGORIES } from "../../utils/getCategories";

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

    if (loadingCourses) return <LoadingComponent size={100} />;

    return (
        <div className=" px-4 py-8">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 space-y-2">
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
                <div className="modal-box space-y-3">
                    <div className="flex w-full justify-center">
                        <h3 className="font-bold text-xl">Crear Nuevo Curso</h3>
                    </div>

                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>

                    <form onSubmit={handleCreateCourse} className="flex flex-col space-y-4 w-full">
                        {/* Título */}
                        <div className="input input-bordered flex items-center gap-2 w-full">
                            <FileType className="w-5 h-5 text-base-content/70 shrink-0" />
                            <input
                                type="text"
                                name="title"
                                placeholder="Ej: Curso de React"
                                className="w-full"
                                required
                            />
                        </div>

                        {/* Descripción */}
                        <div className="textarea textarea-bordered flex w-full items-start gap-2">
                            <BookPlus className="w-5 h-5 mt-2 text-base-content/70 shrink-0" />
                            <textarea
                                name="description"
                                placeholder="Escribe una breve descripción..."
                                className="w-full resize-none"
                                required
                            />
                        </div>

                        {/* Categoría */}
                        <div className="select select-bordered flex items-center gap-4 w-full">
                            <Wallpaper className="w-5 h-5 text-base-content/70 shrink-0" />
                            <select name="category" className="w-full" required>
                                <option value="" className="text-base-content/70">
                                    Selecciona una categoría
                                </option>
                                {COURSE_CATEGORIES.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Imagen */}
                        <fieldset className="fieldset">
                            <label htmlFor="files" className="fieldset-label text-base font-medium">
                                Portada:
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="dropzone-file"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            document.getElementById("dropzone-file").click();
                                        }
                                    }}
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-base-300 text-base-content/70 border-dashed rounded-lg cursor-pointer bg-base-200 focus:outline-none focus:border-primary hover:border-primary duration-200 focus-within:border-primary focus-within:outline-none p-5"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                        <svg
                                            className="w-8 h-8 mb-4"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm">
                                            <span className="font-semibold">
                                                Haz click para subir
                                            </span>{" "}
                                            o arrastra y suelta
                                        </p>
                                        <p className="text-xs">
                                            PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, JPG, JPEG, PNG,
                                            GIF, SVG, WEBP
                                        </p>
                                    </div>
                                    <input
                                        id="dropzone-file"
                                        className="hidden"
                                        type="file"
                                        name="files"
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.svg,.webp"
                                        multiple
                                        required
                                        onChange={() => console.log("cargado")}
                                    />
                                </label>
                            </div>


                            <p className="label w-full text-wrap">
                                Los archivos deben tener un maximo de 10mb cada uno y 25 mb en
                                total.
                            </p>
                        </fieldset>

                        {/* Acciones */}
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
                <div className="modal-box space-y-3">
                    <div className="w-full flex justify-center">
                        <h3 className="font-bold text-xl">Subir Imagen de Portada</h3>
                    </div>
                    <form onSubmit={handleUploadImage} className="flex flex-col space-y-4 w-full">
                        <div className="select select-bordered flex items-center gap-4 w-full">
                            <BookOpenCheck />
                            <select name="course_id" className="w-full" required>
                                <option value="">Selecciona un curso</option>
                                {courses?.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <label className="block mb-2 mt-4">Seleccionar Imagen</label>
                        <input
                            type="file"
                            name="image"
                            className="file-input file-input-bordered w-full"
                            accept="image/*"
                            required
                        />
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
