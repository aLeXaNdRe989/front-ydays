import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Offres = () => {
    const [offres, setOffres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLieu, setFilterLieu] = useState('');
    const [filterContrat, setFilterContrat] = useState('');
    const [selectedOffre, setSelectedOffre] = useState(null);
    const [candidatureMessage, setCandidatureMessage] = useState('');
    const [candidatureStatus, setCandidatureStatus] = useState(null);

    useEffect(() => {
        fetchOffres();
    }, []);

    const fetchOffres = async () => {
        try {
            setLoading(true);
            const response = await api.get('/offres');
            setOffres(response.data.offres || []);
            setError(null);
        } catch (err) {
            console.error('Erreur lors du chargement des offres:', err);
            setError('Impossible de charger les offres');
        } finally {
            setLoading(false);
        }
    };

    const filteredOffres = offres.filter(offre => {
        const matchSearch = offre.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            offre.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchLieu = !filterLieu || offre.lieu?.toLowerCase().includes(filterLieu.toLowerCase());
        const matchContrat = !filterContrat || offre.typeContrat === filterContrat;
        return matchSearch && matchLieu && matchContrat;
    });

    const handleCandidature = async (offreId) => {
        try {
            setCandidatureStatus('loading');
            await api.post(`/offres/${offreId}/candidater`, {
                message: candidatureMessage
            });
            setCandidatureStatus('success');
            setCandidatureMessage('');
            setTimeout(() => {
                setSelectedOffre(null);
                setCandidatureStatus(null);
            }, 2000);
        } catch (err) {
            console.error('Erreur lors de la candidature:', err);
            setCandidatureStatus('error');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Non precisee';
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    const getContratLabel = (type) => {
        return type === 'apprentissage' ? 'Apprentissage' : 'Professionnalisation';
    };

    const getTeletravailLabel = (type) => {
        const labels = { non: 'Non', partiel: 'Partiel', oui: 'Oui' };
        return labels[type] || 'Non precise';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-gray-500">Chargement des offres...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-3xl font-bold mb-2">Offres d'Alternance</h1>
                    <p className="text-orange-100">Trouvez l'alternance qui vous correspond</p>
                </div>
            </section>

            {/* Filtres */}
            <section className="bg-white shadow-md py-6 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Rechercher par titre ou mot-cle..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                        />
                        <input
                            type="text"
                            placeholder="Filtrer par ville..."
                            value={filterLieu}
                            onChange={(e) => setFilterLieu(e.target.value)}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                        />
                        <select
                            value={filterContrat}
                            onChange={(e) => setFilterContrat(e.target.value)}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                        >
                            <option value="">Tous les contrats</option>
                            <option value="apprentissage">Apprentissage</option>
                            <option value="professionnalisation">Professionnalisation</option>
                        </select>
                    </div>
                    <p className="text-gray-500 text-sm mt-4 text-center">
                        {filteredOffres.length} offre{filteredOffres.length > 1 ? 's' : ''} trouvee{filteredOffres.length > 1 ? 's' : ''}
                    </p>
                </div>
            </section>

            {/* Liste des offres */}
            <section className="py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    {filteredOffres.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            Aucune offre ne correspond a vos criteres
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {filteredOffres.map((offre) => (
                                <div
                                    key={offre._id}
                                    className="bg-white border-2 border-orange-500 rounded-xl p-6 shadow-md hover:shadow-lg transition"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">{offre.titre}</h3>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                                                    {getContratLabel(offre.typeContrat)}
                                                </span>
                                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                    {offre.lieu}
                                                </span>
                                                {offre.teletravail && offre.teletravail !== 'non' && (
                                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                                        Teletravail: {getTeletravailLabel(offre.teletravail)}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {offre.description}
                                            </p>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                                                {offre.duree && (
                                                    <div>
                                                        <span className="font-medium">Duree:</span> {offre.duree}
                                                    </div>
                                                )}
                                                {offre.rythme && (
                                                    <div>
                                                        <span className="font-medium">Rythme:</span> {offre.rythme}
                                                    </div>
                                                )}
                                                {offre.niveauEtudes && (
                                                    <div>
                                                        <span className="font-medium">Niveau:</span> {offre.niveauEtudes}
                                                    </div>
                                                )}
                                                {offre.dateDebut && (
                                                    <div>
                                                        <span className="font-medium">Debut:</span> {formatDate(offre.dateDebut)}
                                                    </div>
                                                )}
                                            </div>
                                            {offre.competences && offre.competences.length > 0 && (
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {offre.competences.map((comp, index) => (
                                                        <span
                                                            key={index}
                                                            className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs"
                                                        >
                                                            {comp}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2 md:items-end">
                                            {offre.remuneration && (
                                                <span className="text-lg font-bold text-orange-600">
                                                    {offre.remuneration}
                                                </span>
                                            )}
                                            <button
                                                onClick={() => setSelectedOffre(offre)}
                                                className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-orange-600 transition"
                                            >
                                                Candidater
                                            </button>
                                            {offre.dateLimite && (
                                                <span className="text-xs text-gray-400">
                                                    Avant le {formatDate(offre.dateLimite)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Modal de candidature */}
            {selectedOffre && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Candidater a cette offre
                        </h3>
                        <p className="text-gray-600 mb-4">{selectedOffre.titre}</p>

                        {candidatureStatus === 'success' ? (
                            <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center">
                                Votre candidature a ete envoyee avec succes !
                            </div>
                        ) : (
                            <>
                                <textarea
                                    placeholder="Votre message de motivation (optionnel)..."
                                    value={candidatureMessage}
                                    onChange={(e) => setCandidatureMessage(e.target.value)}
                                    rows="5"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none mb-4"
                                />

                                {candidatureStatus === 'error' && (
                                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
                                        Une erreur est survenue. Veuillez reessayer.
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setSelectedOffre(null);
                                            setCandidatureStatus(null);
                                            setCandidatureMessage('');
                                        }}
                                        className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={() => handleCandidature(selectedOffre._id)}
                                        disabled={candidatureStatus === 'loading'}
                                        className="flex-1 bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
                                    >
                                        {candidatureStatus === 'loading' ? 'Envoi...' : 'Envoyer'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Offres;
