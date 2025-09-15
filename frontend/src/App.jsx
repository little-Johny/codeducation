import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import GuestLayout from "./layouts/GuestLayout";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/(app)/Dashboard";
import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route element={<GuestLayout />}>
                            <Route path="/" element={<Home />}>
                                <Route index element={<Login />} />
                            </Route>
                            <Route path="/register" element={<Home />}>
                                <Route index element={<Register />} />
                            </Route>
                        </Route>
                        <Route element={<AppLayout />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>
                    </Routes>
                    <Toaster position="top-right" />
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}
