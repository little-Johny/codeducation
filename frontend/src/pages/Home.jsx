import Logo from "../assets/codeducation_logo.png";
import Img1 from "../assets/flayer1.jpeg";
import Img2 from "../assets/flayer2.jpeg";
import Img3 from "../assets/flayer3.jpeg";

import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [Img1, Img2, Img3];

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
        <div className="flex flex-col-reverse sm:flex-row w-[90%] xl:w-full h-screen sm:h-full shadow-2xl/40 shadow-primary rounded-lg overflow-hidden bg-base-300">
            <div className="flex flex-col basis-5/5 sm:basis-1/2 h-full w-full max-w-4xl overflow-hidden p-2 bg-base-100 rounded-lg sm:rounded-none xl:rounded-l-lg">
                {/* Logo */}
                <figure className="p-2">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-full h-28 lg:h-full max-h-32 max-w-[60%] object-contain mx-auto"
                    />
                </figure>

                {/* Formulario */}
                <Outlet />
            </div>

            {/* Derecha con imagen */}
            <div className="basis-0/5 sm:basis-1/2 relative bg-base-100 h-full w-full flex items-center justify-center text-base-content overflow-hidden">
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
