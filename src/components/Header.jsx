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

    const goToMesOffres = () => {
        navigate('/mes-offres');
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                <img
                    onClick={clickLogo}
                    src="/logo.png"
                    alt="Logo"
                    className="h-10 cursor-pointer hover:opacity-80 transition-opacity"
                />
                <div className="flex gap-3">
                    {isAdmin && (
                        <button
                            onClick={goToAdmin}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full font-medium transition-colors"
                        >
                            ADMIN
                        </button>
                    )}
                    {user?.role === 'entreprise' && (
                        <button
                            onClick={goToMesOffres}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-full font-medium transition-colors"
                        >
                            MES OFFRES
                        </button>
                    )}
                    <button
                        onClick={goToProfil}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-medium transition-colors"
                    >
                        MON ESPACE
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-full font-medium transition-colors"
                    >
                        Deconnexion
                    </button>
                </div>
            </div>
        </header>
    );
}
