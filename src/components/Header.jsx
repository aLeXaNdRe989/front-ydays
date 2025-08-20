import React from "react";
import {redirect, useNavigate} from "react-router-dom";

export default function Header() {

    const navigate = useNavigate();

    const clickLogo = () => {
        navigate('/Dashboard');
    }

    const goToProfil = () => {
        navigate('/profil')
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <header className="border-b px-4 py-3 bg-white">
            <div className="flex justify-between items-center p-4 bg-white">
                <img onClick={clickLogo} src="/logo.png" alt="Logo" className="h-10 cursor-pointer" />
                <div>
                    <button onClick={goToProfil} className="bg-orange-500 text-white px-4 py-2 rounded-full">MON ESPACE</button>
                    <button onClick={handleLogout} className="bg-gray-300 text-black px-4 py-2 rounded-full">Déconnexion</button>
                </div>
            </div>
        </header>
    );
}