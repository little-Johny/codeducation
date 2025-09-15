import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useApi } from "../../hooks/useQuery";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = Object.fromEntries(new FormData(e.target));

        const response = await useApi("post", "/auth/login", data, true); // true para notificaciones

        if (response.success) {
            login(response.token); // Guardar token en contexto
            navigate("/dashboard");
        } else {
            toast.error(response.message || "Error al iniciar sesión");
        }

        setLoading(false);
    };
    return (
        <div className="flex flex-col gap-4 p-6 flex-grow justify-center w-full  overflow-y-auto md:overflow-hidden">
            {/* Título */}
            <div className="text-center mb-2">
                <h2 className="text-2xl font-bold">Bienvenido</h2>
            </div>

            <form
                className="flex flex-col flex-grow gap-4 w-full max-w-sm mx-auto"
                onSubmit={handleLogin}
            >
                {/* Usuario */}
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="input input-bordered w-full"
                    required
                />

                {/* Contraseña + link recuperación */}
                <div className="flex flex-col gap-1 ">
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        className="input input-bordered w-full"
                        required
                    />
                    <a href="#" className="text-sm text-primary hover:underline self-end mt-6">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>

                {/* Botón continuar */}
                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                    {loading ? "Iniciando sesión..." : "Continuar"}
                </button>

                {/* Separador */}
                <div className="divider w-full max-w-sm mx-auto">o ingresa con</div>

                {/* Botón Google */}
                <button className="btn  btn-outline w-full max-w-sm mx-auto">
                    <svg
                        aria-label="Google logo"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <g>
                            <path d="m0 0H512V512H0" fill="#fff"></path>
                            <path
                                fill="#34a853"
                                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                            ></path>
                            <path
                                fill="#4285f4"
                                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                            ></path>
                            <path
                                fill="#fbbc02"
                                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                            ></path>
                            <path
                                fill="#ea4335"
                                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                            ></path>
                        </g>
                    </svg>
                    Continuar con Google
                </button>
                <span className="text-sm text-base-content self-center mt-6">
                    No tienes una cuenta?
                    <a
                        className="hover:underline text-primary cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        Registrate
                    </a>
                </span>
            </form>
            <div className=" flex flex-col items-center justify-center">
                <div className="text-xs text-center text-base-content pt-4 pb-4 lg:pb-0">
                    © {new Date().getFullYear()} Plataforma Software. Todos los derechos reservados.
                </div>
            </div>
        </div>
    );
}
