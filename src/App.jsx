import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginRegister from "./pages/LoginRegister.jsx";
import EntreprisesPage from "./pages/Entreprises.jsx";
import Profil from "./pages/Profil.jsx";
import Layout from "./components/Layout.jsx";

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<LoginRegister />} />
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
            </Route>
        </Routes>
    );
};

export default App;