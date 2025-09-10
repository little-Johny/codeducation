import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GuestLayout from "./layouts/GuestLayout";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/(app)/Dashboard";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<GuestLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route element={<AppLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
