import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const ProtectedRoute = ({ children, requiredRole, requireApproval = true }) => {
    const { user, loading, isAuthenticated, isApproved, isAdmin } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-500">Chargement...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Vérifier le rôle requis
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/dashboard" replace />;
    }

    // Les admins passent toujours
    if (isAdmin) {
        return children;
    }

    // Vérifier l'approbation si requise
    if (requireApproval && !isApproved) {
        return <Navigate to="/pending-approval" replace />;
    }

    return children;
};

export default ProtectedRoute;
