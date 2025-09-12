import Logo from "../assets/plataforma software.png";
import Img1 from "../assets/DSC04537 (1) (1).JPG";
import Img2 from "../assets/1e343d_8eb12c9fa1074244b9eb4714e71b1467~mv2.png";
import Img3 from "../assets/1e343d_855a517c271c4fd984fa9a7c7e14c237~mv2.jpg";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const slides = [Img1, Img2, Img3];

    const handleLogin = (e) => {
        e.preventDefault;
        navigate("/dashboard");
    };

    useEffect(() => {
        const handleKeyboard = (e) => {
            if (e.key === "ArrowRight") setCurrentSlide((prev) => (prev + 1) % slides.length);

            if (e.key === "ArrowLeft")
                setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        };
        window.addEventListener("keydown", handleKeyboard);
        return () => window.removeEventListener("keydown", handleKeyboard);
    }, [slides.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="flex flex-col-reverse sm:flex-row h-screen sm:h-full  sm:m-0 shadow-2xl/30  rounded-lg overflow-hidden bg-base-300">
            <div className="flex flex-col basis-4/5 sm:basis-1/2 h-full w-full max-w-4xl overflow-hidden p-2 bg-base-100 rounded-lg shadow-xl">
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

                    <form
                        className="flex flex-col flex-grow gap-4 w-full max-w-sm mx-auto"
                        onSubmit={handleLogin}
                    >
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
                                className="text-sm text-primary hover:underline self-end mt-6"
                            >
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        {/* Botón continuar */}
                        <button type="submit" className="btn btn-primary w-full">
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
                        <span className="text-sm text-base-content self-end mt-6">
                            No tienes una cuenta?
                            <a className="hover:underline text-primary">Registrate</a>
                        </span>
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
            <div className="basis-1/5 sm:basis-1/2 relative bg-base-100 h-full w-full flex items-center justify-center text-base-content overflow-hidden">
                <img
                    src={slides[currentSlide]}
                    alt={`Slide ${currentSlide + 1}`}
                    className="h-full w-full object-cover transition-all duration-700"
                />

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full ${
                                currentSlide === index ? "bg-white" : "bg-white/50"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
