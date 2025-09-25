import { useNavigate } from "react-router-dom";
import { fetchApiData } from "../../hooks/useQuery";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));

        const response = await fetchApiData("POST", "/auth/register", formData, true);

        if (response.success) {
            login(response.data.token, response.data.user);
            navigate("/dashboard");
        } else {
            toast.error(response.error || "Error de registro");
        }
    };
    return (
        <div className="flex flex-col gap-6 p-6 flex-grow justify-center max-h-screen overflow-y-auto">
            {/* Título */}
            <h2 className="text-3xl font-bold text-center">Crear cuenta</h2>

            {/* Formulario */}
            <form className="flex flex-col gap-4 w-full max-w-sm mx-auto" onSubmit={handleRegister}>
                {/* Nombre */}
                <input
                    type="text"
                    name="name"
                    placeholder="Usuario"
                    className="input input-bordered w-full"
                />

                {/* Correo */}
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered w-full"
                />

                {/* Contraseña */}
                <input
                    type="password"
                    id="password"
                    name="password"
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
