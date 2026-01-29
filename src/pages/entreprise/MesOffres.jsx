import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const MesOffres = () => {
    const [offres, setOffres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOffres();
    }, []);

    const fetchOffres = async () => {
        try {
            setLoading(true);
            const res = await api.get('/offres/mes-offres');
            setOffres(res.data.offres || res.data);
        } catch (err) {
            setError('Erreur lors du chargement des offres');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (offreId) => {
        if (!confirm('Etes-vous sur de vouloir supprimer cette offre ?')) return;
        try {
            await api.delete(`/offres/${offreId}`);
            fetchOffres();
        } catch (err) {
            alert('Erreur lors de la suppression');
        }
    };

    const getStatusBadge = (offre) => {
        const now = new Date();
        const dateLimite = offre.dateLimite ? new Date(offre.dateLimite) : null;

        if (dateLimite && dateLimite < now) {
            return <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">Expiree</span>;
        }
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Active</span>;
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">Mes offres d'alternance</h1>
                    <Link
                        to="/creer-offre"
                        className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Creer une offre
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="text-gray-500">Chargement...</div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-200">
                        {error}
                    </div>
                ) : offres.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Aucune offre publiee</h2>
                        <p className="text-gray-500 mb-6">Commencez par creer votre premiere offre d'alternance</p>
                        <Link
                            to="/creer-offre"
                            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-block"
                        >
                            Creer ma premiere offre
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {offres.map((offre) => (
                            <div key={offre._id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {offre.titre}
                                            </h3>
                                            {getStatusBadge(offre)}
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {offre.lieu || 'Non precise'}
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {offre.duree || 'Duree non precisee'}
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                {offre.typeContrat === 'apprentissage' ? "Apprentissage" : "Professionnalisation"}
                                            </span>
                                        </div>

                                        {offre.niveauEtudes && (
                                            <div className="mt-2">
                                                <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                                                    {offre.niveauEtudes}
                                                </span>
                                            </div>
                                        )}

                                        <p className="text-gray-500 text-sm mt-3">
                                            Publiee le {new Date(offre.createdAt).toLocaleDateString('fr-FR')}
                                            {offre.dateLimite && (
                                                <> - Limite: {new Date(offre.dateLimite).toLocaleDateString('fr-FR')}</>
                                            )}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link
                                            to={`/modifier-offre/${offre._id}`}
                                            className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                                        >
                                            Modifier
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(offre._id)}
                                            className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MesOffres;
