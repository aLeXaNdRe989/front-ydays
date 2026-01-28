import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import ProtectedRoute from './components/ProtectedRoute';

import Dashboard from './pages/Dashboard';
import LoginRegister from "./pages/LoginRegister.jsx";
import EntreprisesPage from "./pages/Entreprises.jsx";
import Profil from "./pages/Profil.jsx";
import Layout from "./components/Layout.jsx";
import RegisterEntreprise from "./pages/RegisterEntreprise.jsx";
import PendingApproval from "./pages/PendingApproval.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminEntreprises from "./pages/admin/AdminEntreprises.jsx";
import AdminOffres from "./pages/admin/AdminOffres.jsx";

const AppRoutes = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-500">Chargement...</div>
            </div>
        );
    }

    return (
        <Routes>
            {/* Routes publiques */}
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginRegister />} />
            <Route path="/register-entreprise" element={<RegisterEntreprise />} />

            {/* Page d'attente de validation (accessible si connecte mais pas approuve) */}
            <Route path="/pending-approval" element={<PendingApproval />} />

            {/* Routes protegees avec Layout */}
            <Route element={<Layout />}>
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/entreprises"
                    element={
                        <ProtectedRoute>
                            <EntreprisesPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profil"
                    element={
                        <ProtectedRoute>
                            <Profil />
                        </ProtectedRoute>
                    }
                />

                {/* Routes admin */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminUsers />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/entreprises"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminEntreprises />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/offres"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminOffres />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
};

export default App;
