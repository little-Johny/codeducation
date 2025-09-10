import Logo from "../assets/plataforma software.png";
import ImgPort from "../assets/DSC04537 (1) (1).JPG";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault;
        navigate("/dashboard");
    };

    return (
        <div className="flex flex-col-reverse sm:flex-row h-screen sm:h-full  sm:m-0 shadow-2xl/30  rounded-lg overflow-hidden bg-base-300">
            <div className="flex flex-col basis-4/5 sm:basis-1/2 h-full w-full max-w-4xl overflow-hidden p-2">
                {/* Logo */}
                <figure className="p-2">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-full h-28 lg:h-full max-h-32 max-w-[60%] object-contain mx-auto"
                    />
                </figure>

                {/* Formulario */}
                <div className="flex flex-col gap-4 p-6 flex-grow justify-center w-full  overflow-y-auto md:overflow-hidden">
                    {/* Título */}
                    <div className="text-center mb-2">
                        <h2 className="text-2xl font-bold">Bienvenido</h2>
                    </div>

                    <form className="flex flex-col flex-grow gap-4 w-full max-w-sm mx-auto" onSubmit={handleLogin}>
                        {/* Usuario */}
                        <input
                            type="text"
                            placeholder="Usuario"
                            className="input input-bordered w-full"
                        />

                        {/* Contraseña + link recuperación */}
                        <div className="flex flex-col gap-1 ">
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="input input-bordered w-full"
                            />
                            <a
                                href="#"
                                className="text-sm text-orange-500 hover:underline self-end mt-6"
                            >
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        {/* Botón continuar */}
                        <button
                            type="submit"
                            className="btn bg-orange-500 hover:bg-orange-600 text-white w-full"
                        >
                            Continuar
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
                    </form>
                    <div className=" flex flex-col items-center justify-center">
                        <div className="text-xs text-center text-base-content pt-4 pb-4 lg:pb-0">
                            © {new Date().getFullYear()} Plataforma Software. Todos los derechos
                            reservados.
                        </div>
                    </div>
                </div>
            </div>

            {/* Derecha con imagen */}
            <div className="basis-1/5 sm:basis-1/2 relative bg-orange-300 h-full w-full flex items-center justify-center text-white">
                <figure className="h-full w-full">
                    <img src={ImgPort} alt="Portada" className="h-full w-full object-cover" />
                </figure>
            </div>
        </div>
    );
}
