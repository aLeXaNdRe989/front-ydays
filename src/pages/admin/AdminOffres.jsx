import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AdminOffres = () => {
    const [offres, setOffres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [pagination, setPagination] = useState({ page: 1, pages: 1 });

    useEffect(() => {
        fetchOffres();
    }, [pagination.page]);

    const fetchOffres = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/admin/offres?page=${pagination.page}`);
            setOffres(res.data.offres);
            setPagination(prev => ({ ...prev, pages: res.data.pagination.pages }));
        } catch (err) {
            setError('Erreur lors du chargement des offres');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (offreId) => {
        if (!confirm('Supprimer cette offre ?')) return;
        try {
            await api.delete(`/admin/offres/${offreId}`);
            fetchOffres();
        } catch (err) {
            alert('Erreur lors de la suppression');
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Gestion des offres</h1>
                <Link to="/admin" className="text-purple-600 hover:underline">
                    Retour au dashboard
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-8">Chargement...</div>
            ) : error ? (
                <div className="text-red-500 text-center py-8">{error}</div>
            ) : (
                <>
                    {/* Tableau */}
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Titre</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Entreprise</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Lieu</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {offres.map((offre) => (
                                    <tr key={offre._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <p className="font-medium">{offre.titre || offre.title || 'Sans titre'}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            {offre.entreprise?.nom || '-'}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                                {offre.type || offre.contrat || '-'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            {offre.lieu || offre.localisation || '-'}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            {new Date(offre.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => handleDelete(offre._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {offres.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                Aucune offre trouvee
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {pagination.pages > 1 && (
                        <div className="flex justify-center gap-2 mt-4">
                            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setPagination({ ...pagination, page })}
                                    className={`px-3 py-1 rounded ${
                                        pagination.page === page
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminOffres;
