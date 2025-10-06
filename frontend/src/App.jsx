import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import GuestLayout from "./layouts/GuestLayout";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Dashboard from "./pages/(app)/Dashboard";
import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import CoursesManagement from "./pages/(app)/CoursesManagement";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider>
                    <Routes>
                        <Route element={<ProtectedRoute mustBeAuth={false} />}>
                            <Route element={<GuestLayout />}>
                                <Route path="/" element={<Home />}>
                                    <Route index element={<Login />} />
                                </Route>
                                <Route path="/register" element={<Home />}>
                                    <Route index element={<Register />} />
                                </Route>
                            </Route>
                        </Route>
                        <Route element={<ProtectedRoute mustBeAuth />}>
                            <Route element={<AppLayout />}>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/courses" element={<CoursesManagement />} />
                            </Route>
                        </Route>
                    </Routes>
                    <ToastContainer position="top-right" />
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}
