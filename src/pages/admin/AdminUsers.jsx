import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState({ status: '', role: '' });
    const [pagination, setPagination] = useState({ page: 1, pages: 1 });
    const [rejectModal, setRejectModal] = useState({ open: false, userId: null, reason: '' });

    useEffect(() => {
        fetchUsers();
    }, [filter, pagination.page]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (filter.status) params.append('status', filter.status);
            if (filter.role) params.append('role', filter.role);
            params.append('page', pagination.page);

            const res = await api.get(`/admin/users?${params.toString()}`);
            setUsers(res.data.users);
            setPagination(prev => ({ ...prev, pages: res.data.pagination.pages }));
        } catch (err) {
            setError('Erreur lors du chargement des utilisateurs');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (userId) => {
        try {
            await api.patch(`/admin/users/${userId}/approval`, { isApproved: 'approved' });
            fetchUsers();
        } catch (err) {
            alert('Erreur lors de la validation');
        }
    };

    const handleReject = async () => {
        try {
            await api.patch(`/admin/users/${rejectModal.userId}/approval`, {
                isApproved: 'rejected',
                rejectionReason: rejectModal.reason
            });
            setRejectModal({ open: false, userId: null, reason: '' });
            fetchUsers();
        } catch (err) {
            alert('Erreur lors du rejet');
        }
    };

    const handleDelete = async (userId) => {
        if (!confirm('Supprimer cet utilisateur ?')) return;
        try {
            await api.delete(`/admin/users/${userId}`);
            fetchUsers();
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
            approved: 'Approuve',
            rejected: 'Rejete'
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const getRoleBadge = (role) => {
        const styles = {
            candidat: 'bg-blue-100 text-blue-800',
            entreprise: 'bg-purple-100 text-purple-800'
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs ${styles[role]}`}>
                {role}
            </span>
        );
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
                <Link to="/admin" className="text-purple-600 hover:underline">
                    Retour au dashboard
                </Link>
            </div>

            {/* Filtres */}
            <div className="bg-white rounded-xl shadow p-4 mb-6 flex gap-4">
                <select
                    className="p-2 border rounded"
                    value={filter.status}
                    onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                >
                    <option value="">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="approved">Approuves</option>
                    <option value="rejected">Rejetes</option>
                </select>
                <select
                    className="p-2 border rounded"
                    value={filter.role}
                    onChange={(e) => setFilter({ ...filter, role: e.target.value })}
                >
                    <option value="">Tous les roles</option>
                    <option value="candidat">Candidats</option>
                    <option value="entreprise">Entreprises</option>
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
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Nom</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Statut</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            {user.prenom} {user.nom}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                                        <td className="px-4 py-3">{getRoleBadge(user.role)}</td>
                                        <td className="px-4 py-3">{getStatusBadge(user.isApproved)}</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                {user.isApproved === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(user._id)}
                                                            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                                                        >
                                                            Valider
                                                        </button>
                                                        <button
                                                            onClick={() => setRejectModal({ open: true, userId: user._id, reason: '' })}
                                                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                                        >
                                                            Rejeter
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(user._id)}
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

                        {users.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                Aucun utilisateur trouve
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
                                onClick={() => setRejectModal({ open: false, userId: null, reason: '' })}
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

export default AdminUsers;
