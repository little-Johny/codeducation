import { Outlet } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function GuestLayout() {
    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-base-200 relative">
            <div className="absolute top-4 right-4 z-10">
                <ThemeToggle />
            </div>
            <div className="w-full h-full sm:max-w-6xl sm:h-[80vh] flex justify-center">
                <Outlet />
            </div>
        </div>
    );
}
