import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-6 p-6 flex-grow justify-center max-h-screen overflow-y-auto">
            {/* Título */}
            <h2 className="text-3xl font-bold text-center">Crear cuenta</h2>

            {/* Formulario */}
            <form className="flex flex-col gap-4 w-full max-w-sm mx-auto">
                {/* Nombre */}
                <input type="text" placeholder="Usuario" className="input input-bordered w-full" />

                {/* Correo */}
                <input type="email" placeholder="email" className="input input-bordered w-full" />

                {/* Contraseña */}
                <input
                    type="password"
                    id="password"
                    className="input input-bordered w-full"
                    placeholder="********"
                />

                {/* Botón */}
                <button type="submit" className="btn btn-primary w-full">
                    Registrarse
                </button>
            </form>

            {/* Enlace a login */}
            <p className="text-center text-sm">
                ¿Ya tienes cuenta?
                <span onClick={() => navigate("/")} className="link link-primary">
                    Iniciar sesión
                </span>
            </p>
        </div>
    );
}
