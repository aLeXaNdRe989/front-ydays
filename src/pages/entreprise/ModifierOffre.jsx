import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../services/api';

const ModifierOffre = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [loadingOffre, setLoadingOffre] = useState(true);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        titre: '',
        typeContrat: 'apprentissage',
        description: '',
        profilRecherche: '',
        competences: '',
        niveauEtudes: '',
        duree: '',
        rythme: '',
        dateDebut: '',
        lieu: '',
        codePostal: '',
        teletravail: 'non',
        remuneration: '',
        avantages: '',
        dateLimite: '',
        statut: 'active'
    });

    useEffect(() => {
        fetchOffre();
    }, [id]);

    const fetchOffre = async () => {
        try {
            setLoadingOffre(true);
            const res = await api.get(`/offres/${id}`);
            const offre = res.data;

            setForm({
                titre: offre.titre || '',
                typeContrat: offre.typeContrat || 'apprentissage',
                description: offre.description || '',
                profilRecherche: offre.profilRecherche || '',
                competences: offre.competences?.join(', ') || '',
                niveauEtudes: offre.niveauEtudes || '',
                duree: offre.duree || '',
                rythme: offre.rythme || '',
                dateDebut: offre.dateDebut ? offre.dateDebut.split('T')[0] : '',
                lieu: offre.lieu || '',
                codePostal: offre.codePostal || '',
                teletravail: offre.teletravail || 'non',
                remuneration: offre.remuneration || '',
                avantages: offre.avantages || '',
                dateLimite: offre.dateLimite ? offre.dateLimite.split('T')[0] : '',
                statut: offre.statut || 'active'
            });
        } catch (err) {
            setError('Erreur lors du chargement de l\'offre');
        } finally {
            setLoadingOffre(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!form.titre || !form.description || !form.lieu) {
            setError('Veuillez remplir tous les champs obligatoires');
            return;
        }

        setLoading(true);

        try {
            await api.put(`/offres/${id}`, {
                titre: form.titre,
                typeContrat: form.typeContrat,
                description: form.description,
                profilRecherche: form.profilRecherche,
                competences: form.competences.split(',').map(c => c.trim()).filter(c => c),
                niveauEtudes: form.niveauEtudes,
                duree: form.duree,
                rythme: form.rythme,
                dateDebut: form.dateDebut,
                lieu: form.lieu,
                codePostal: form.codePostal,
                teletravail: form.teletravail,
                remuneration: form.remuneration,
                avantages: form.avantages,
                dateLimite: form.dateLimite,
                statut: form.statut
            });

            navigate('/mes-offres');
        } catch (err) {
            setError(err.response?.data?.msg || "Erreur lors de la modification de l'offre");
        } finally {
            setLoading(false);
        }
    };

    if (loadingOffre) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-gray-500">Chargement de l'offre...</div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Modifier l'offre</h1>
                    <Link to="/mes-offres" className="text-purple-600 hover:underline">
                        Retour a mes offres
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-center border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informations principales */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Informations principales</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Titre du poste *
                                </label>
                                <input
                                    type="text"
                                    name="titre"
                                    placeholder="Ex: Developpeur Web en alternance"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                    value={form.titre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Type de contrat *
                                    </label>
                                    <select
                                        name="typeContrat"
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                        value={form.typeContrat}
                                        onChange={handleChange}
                                    >
                                        <option value="apprentissage">Contrat d'apprentissage</option>
                                        <option value="professionnalisation">Contrat de professionnalisation</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Niveau d'etudes recherche
                                    </label>
                                    <select
                                        name="niveauEtudes"
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                        value={form.niveauEtudes}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selectionnez un niveau</option>
                                        <option value="CAP-BEP">CAP / BEP</option>
                                        <option value="Bac">Bac</option>
                                        <option value="Bac+2">Bac+2 (BTS, DUT)</option>
                                        <option value="Bac+3">Bac+3 (Licence, Bachelor)</option>
                                        <option value="Bac+4">Bac+4 (Master 1)</option>
                                        <option value="Bac+5">Bac+5 (Master, Ingenieur)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description du poste *
                                </label>
                                <textarea
                                    name="description"
                                    placeholder="Decrivez les missions principales, les taches quotidiennes..."
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition h-32 resize-none"
                                    value={form.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Profil recherche
                                </label>
                                <textarea
                                    name="profilRecherche"
                                    placeholder="Formation visee, qualites attendues..."
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition h-24 resize-none"
                                    value={form.profilRecherche}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Competences requises
                                </label>
                                <input
                                    type="text"
                                    name="competences"
                                    placeholder="Ex: JavaScript, React, Node.js (separees par des virgules)"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                    value={form.competences}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Conditions du contrat */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Conditions du contrat</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Duree du contrat
                                </label>
                                <select
                                    name="duree"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                    value={form.duree}
                                    onChange={handleChange}
                                >
                                    <option value="">Selectionnez une duree</option>
                                    <option value="6 mois">6 mois</option>
                                    <option value="12 mois">12 mois (1 an)</option>
                                    <option value="18 mois">18 mois</option>
                                    <option value="24 mois">24 mois (2 ans)</option>
                                    <option value="36 mois">36 mois (3 ans)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Rythme d'alternance
                                </label>
                                <input
                                    type="text"
                                    name="rythme"
                                    placeholder="Ex: 3 jours entreprise / 2 jours ecole"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                    value={form.rythme}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date de debut souhaitee
                                </label>
                                <input
                                    type="date"
                                    name="dateDebut"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                    value={form.dateDebut}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date limite de candidature
                                </label>
                                <input
                                    type="date"
                                    name="dateLimite"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                    value={form.dateLimite}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Remuneration
                                </label>
                                <input
                                    type="text"
                                    name="remuneration"
                                    placeholder="Ex: Selon grille legale ou montant"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                    value={form.remuneration}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Teletravail
                                </label>
                                <select
                                    name="teletravail"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                    value={form.teletravail}
                                    onChange={handleChange}
                                >
                                    <option value="non">Non</option>
                                    <option value="partiel">Partiel</option>
                                    <option value="oui">Oui (100%)</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Avantages
                            </label>
                            <input
                                type="text"
                                name="avantages"
                                placeholder="Ex: Tickets restaurant, mutuelle, transport..."
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                value={form.avantages}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Localisation */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Localisation</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ville *
                                </label>
                                <input
                                    type="text"
                                    name="lieu"
                                    placeholder="Ex: Paris"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                    value={form.lieu}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Code postal
                                </label>
                                <input
                                    type="text"
                                    name="codePostal"
                                    placeholder="Ex: 75001"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                    value={form.codePostal}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Statut de l'offre */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Statut de l'offre</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Statut
                            </label>
                            <select
                                name="statut"
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                value={form.statut}
                                onChange={handleChange}
                            >
                                <option value="active">Active - Visible par les candidats</option>
                                <option value="pourvue">Pourvue - Poste pourvu</option>
                                <option value="fermee">Fermee - Non visible</option>
                            </select>
                        </div>
                    </div>

                    {/* Boutons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors disabled:opacity-50 w-full sm:w-auto"
                        >
                            {loading ? 'Enregistrement...' : "ENREGISTRER LES MODIFICATIONS"}
                        </button>

                        <Link
                            to="/mes-offres"
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            Annuler
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModifierOffre;
