import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GuestLayout from "./layouts/GuestLayout";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/(app)/Dashboard";
import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<GuestLayout />}>
                    <Route element={<Home />}>
                        <Route path="/" element={<Login />} />
                    </Route>
                    <Route element={<Home />}>
                        <Route path="/register" element={<Register />} />
                    </Route>
                </Route>
                <Route element={<AppLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
