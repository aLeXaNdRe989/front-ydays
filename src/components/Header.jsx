import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

export default function Header() {
    const navigate = useNavigate();
    const { user, logout, isAdmin } = useAuth();

    const clickLogo = () => {
        navigate('/dashboard');
    };

    const goToProfil = () => {
        navigate('/profil');
    };

    const goToAdmin = () => {
        navigate('/admin');
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="border-b px-4 py-3 bg-white">
            <div className="flex justify-between items-center p-4 bg-white">
                <img onClick={clickLogo} src="/logo.png" alt="Logo" className="h-10 cursor-pointer" />
                <div className="flex gap-2">
                    {isAdmin && (
                        <button
                            onClick={goToAdmin}
                            className="bg-purple-600 text-white px-4 py-2 rounded-full"
                        >
                            ADMIN
                        </button>
                    )}
                    <button onClick={goToProfil} className="bg-orange-500 text-white px-4 py-2 rounded-full">
                        MON ESPACE
                    </button>
                    <button onClick={handleLogout} className="bg-gray-300 text-black px-4 py-2 rounded-full">
                        Deconnexion
                    </button>
                </div>
            </div>
        </header>
    );
}
