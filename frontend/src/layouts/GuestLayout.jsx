import { Outlet } from "react-router-dom";

export default function GuestLayout() {
    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-base-200">
            <div className="w-full h-full sm:max-w-6xl sm:h-[80vh] ">
                <Outlet />
            </div>
        </div>
    );
}
