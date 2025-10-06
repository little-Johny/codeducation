export default function LessonForm({ onSubmit = () => {} }) {
    return (
        <form
            onSubmit={onSubmit}
            encType="multipart/form-data" // ✅ importante para archivos
            className="flex flex-col gap-3 w-full"
        >
            <div>
                <label className="block text-sm font-semibold">Nombre</label>
                <input name="name" type="text" required className="input input-bordered w-full" />
            </div>

            <div>
                <label className="block text-sm font-semibold">Descripción</label>
                <textarea
                    name="description"
                    rows="3"
                    className="textarea textarea-bordered w-full"
                ></textarea>
            </div>

            <fieldset className="fieldset">
                <label htmlFor="dropzone-video" className="fieldset-label text-base font-medium">
                    Video:
                </label>
                <div className="flex items-center justify-center w-full">
                    <label
                        htmlFor="dropzone-video"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                document.getElementById("dropzone-video").click();
                            }
                        }}
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-base-300 text-base-content/70 border-dashed rounded-lg cursor-pointer bg-base-200 focus:outline-none focus:border-primary hover:border-primary duration-200 focus-within:border-primary p-5"
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
                                <span className="font-semibold">Haz click para subir</span> o
                                arrastra y suelta tu video
                            </p>
                            <p className="text-xs">MP4, MOV, AVI, MKV — Máx. 50 MB</p>
                        </div>
                        <input
                            id="dropzone-video"
                            className="hidden"
                            type="file"
                            name="videoUrl"
                            accept="video/*" // ✅ acepta videos
                            required
                            onChange={() => console.log("Video cargado")}
                        />
                    </label>
                </div>
            </fieldset>

            <button type="submit" className="btn btn-primary mt-2">
                Guardar
            </button>
        </form>
    );
}
