import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginRegister from "./pages/LoginRegister.jsx";
import EntreprisesPage from "./pages/Entreprises.jsx";
import Profil from "./pages/Profil.jsx";

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Routes>
            <Route path="/" element={<LoginRegister />} />
            <Route
                path="/dashboard"
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
                path="/entreprises"
                element={isAuthenticated ? <EntreprisesPage /> : <Navigate to="/"/>}
            />
            <Route
                path="/profil"
                element={isAuthenticated ? <Profil /> : <Navigate to="/"/>}
            />
        </Routes>
    );
};

export default App;