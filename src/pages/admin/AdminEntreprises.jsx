import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AdminEntreprises = () => {
    const [entreprises, setEntreprises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState({ status: '' });
    const [pagination, setPagination] = useState({ page: 1, pages: 1 });
    const [rejectModal, setRejectModal] = useState({ open: false, entrepriseId: null, reason: '' });

    useEffect(() => {
        fetchEntreprises();
    }, [filter, pagination.page]);

    const fetchEntreprises = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (filter.status) params.append('status', filter.status);
            params.append('page', pagination.page);

            const res = await api.get(`/admin/entreprises?${params.toString()}`);
            setEntreprises(res.data.entreprises);
            setPagination(prev => ({ ...prev, pages: res.data.pagination.pages }));
        } catch (err) {
            setError('Erreur lors du chargement des entreprises');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (entrepriseId) => {
        try {
            await api.patch(`/admin/entreprises/${entrepriseId}/approval`, { isApproved: 'approved' });
            fetchEntreprises();
        } catch (err) {
            alert('Erreur lors de la validation');
        }
    };

    const handleReject = async () => {
        try {
            await api.patch(`/admin/entreprises/${rejectModal.entrepriseId}/approval`, {
                isApproved: 'rejected',
                rejectionReason: rejectModal.reason
            });
            setRejectModal({ open: false, entrepriseId: null, reason: '' });
            fetchEntreprises();
        } catch (err) {
            alert('Erreur lors du rejet');
        }
    };

    const handleDelete = async (entrepriseId) => {
        if (!confirm('Supprimer cette entreprise ? Les offres associees seront egalement supprimees.')) return;
        try {
            await api.delete(`/admin/entreprises/${entrepriseId}`);
            fetchEntreprises();
        } catch (err) {
            alert('Erreur lors de la suppression');
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800'
        };
        const labels = {
            pending: 'En attente',
            approved: 'Approuvee',
            rejected: 'Rejetee'
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Gestion des entreprises</h1>
                <Link to="/admin" className="text-purple-600 hover:underline">
                    Retour au dashboard
                </Link>
            </div>

            {/* Filtres */}
            <div className="bg-white rounded-xl shadow p-4 mb-6">
                <select
                    className="p-2 border rounded"
                    value={filter.status}
                    onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                >
                    <option value="">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="approved">Approuvees</option>
                    <option value="rejected">Rejetees</option>
                </select>
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
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Entreprise</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Responsable</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Statut</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {entreprises.map((entreprise) => (
                                    <tr key={entreprise._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <div>
                                                <p className="font-medium">{entreprise.nom}</p>
                                                {entreprise.adresse && (
                                                    <p className="text-xs text-gray-500">{entreprise.adresse}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{entreprise.email}</td>
                                        <td className="px-4 py-3 text-sm">
                                            {entreprise.createdBy ? (
                                                <div>
                                                    <p>{entreprise.createdBy.prenom} {entreprise.createdBy.nom}</p>
                                                    <p className="text-xs text-gray-500">{entreprise.createdBy.email}</p>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">{getStatusBadge(entreprise.isApproved)}</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            {new Date(entreprise.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                {entreprise.isApproved === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(entreprise._id)}
                                                            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                                                        >
                                                            Valider
                                                        </button>
                                                        <button
                                                            onClick={() => setRejectModal({ open: true, entrepriseId: entreprise._id, reason: '' })}
                                                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                                        >
                                                            Rejeter
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(entreprise._id)}
                                                    className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {entreprises.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                Aucune entreprise trouvee
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

            {/* Modal de rejet */}
            {rejectModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Motif du rejet</h3>
                        <textarea
                            className="w-full p-2 border rounded mb-4 h-24"
                            placeholder="Indiquez le motif du rejet..."
                            value={rejectModal.reason}
                            onChange={(e) => setRejectModal({ ...rejectModal, reason: e.target.value })}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setRejectModal({ open: false, entrepriseId: null, reason: '' })}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleReject}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Rejeter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminEntreprises;
