import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/admin/dashboard');
            setStats(res.data);
        } catch (err) {
            setError('Erreur lors du chargement des statistiques');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-500">Chargement...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Administration</h1>

            {/* Alertes */}
            {(stats.pendingUsers > 0 || stats.pendingEntreprises > 0) && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
                    <div className="flex items-center">
                        <svg className="w-6 h-6 text-yellow-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                            <p className="font-semibold">Validations en attente</p>
                            <p className="text-sm">
                                {stats.pendingUsers > 0 && `${stats.pendingUsers} utilisateur(s)`}
                                {stats.pendingUsers > 0 && stats.pendingEntreprises > 0 && ' et '}
                                {stats.pendingEntreprises > 0 && `${stats.pendingEntreprises} entreprise(s)`}
                                {' '}en attente de validation
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Utilisateurs</p>
                            <p className="text-3xl font-bold">{stats.totalUsers}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full">
                            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                    {stats.pendingUsers > 0 && (
                        <p className="text-yellow-600 text-sm mt-2">
                            {stats.pendingUsers} en attente
                        </p>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Entreprises</p>
                            <p className="text-3xl font-bold">{stats.totalEntreprises}</p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-full">
                            <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                    </div>
                    {stats.pendingEntreprises > 0 && (
                        <p className="text-yellow-600 text-sm mt-2">
                            {stats.pendingEntreprises} en attente
                        </p>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Offres</p>
                            <p className="text-3xl font-bold">{stats.totalOffres}</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation rapide */}
            <div className="grid md:grid-cols-3 gap-4">
                <Link
                    to="/admin/users"
                    className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition flex items-center gap-4"
                >
                    <div className="bg-blue-500 text-white p-3 rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold">Gerer les utilisateurs</h3>
                        <p className="text-sm text-gray-500">Valider, rejeter, supprimer</p>
                    </div>
                </Link>

                <Link
                    to="/admin/entreprises"
                    className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition flex items-center gap-4"
                >
                    <div className="bg-purple-500 text-white p-3 rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold">Gerer les entreprises</h3>
                        <p className="text-sm text-gray-500">Valider, rejeter, supprimer</p>
                    </div>
                </Link>

                <Link
                    to="/admin/offres"
                    className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition flex items-center gap-4"
                >
                    <div className="bg-green-500 text-white p-3 rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold">Gerer les offres</h3>
                        <p className="text-sm text-gray-500">Voir et supprimer</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
