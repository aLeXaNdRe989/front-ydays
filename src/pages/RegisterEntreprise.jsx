import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const RegisterEntreprise = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [form, setForm] = useState({
        // Infos personnelles
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        password: '',
        confirmPassword: '',
        // Infos entreprise
        entrepriseNom: '',
        entrepriseDescription: '',
        entrepriseAdresse: '',
        entrepriseEmail: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (form.password !== form.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        if (form.password.length < 10) {
            setError('Le mot de passe doit contenir au moins 10 caracteres');
            return;
        }

        setLoading(true);

        try {
            await api.post('/auth/register-entreprise', {
                nom: form.nom,
                prenom: form.prenom,
                email: form.email,
                telephone: form.telephone,
                password: form.password,
                entrepriseNom: form.entrepriseNom,
                entrepriseDescription: form.entrepriseDescription,
                entrepriseAdresse: form.entrepriseAdresse,
                entrepriseEmail: form.entrepriseEmail
            });

            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.msg || "Erreur lors de l'inscription");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
                <div className="bg-green-100 text-green-800 p-8 rounded-xl max-w-md text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold mb-4">Inscription enregistree</h2>
                    <p className="mb-6">
                        Votre demande d'inscription a bien ete enregistree.
                        Un administrateur va examiner votre dossier et vous serez notifie une fois votre compte valide.
                    </p>
                    <Link
                        to="/"
                        className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition inline-block"
                    >
                        Retour a la connexion
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-8">
            <img src="/logo.png" alt="Logo" className="h-32 my-6" />

            <div className="w-full max-w-2xl">
                <h1 className="text-2xl font-bold text-center mb-6">Inscription Entreprise</h1>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informations personnelles */}
                    <div className="border-2 border-purple-500 rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-4">Informations personnelles</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="prenom"
                                placeholder="Prenom"
                                className="p-2 bg-gray-200 rounded"
                                value={form.prenom}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="nom"
                                placeholder="Nom"
                                className="p-2 bg-gray-200 rounded"
                                value={form.nom}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Adresse mail"
                                className="p-2 bg-gray-200 rounded"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="tel"
                                name="telephone"
                                placeholder="Telephone"
                                className="p-2 bg-gray-200 rounded"
                                value={form.telephone}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Mot de passe (10 car. min)"
                                className="p-2 bg-gray-200 rounded"
                                value={form.password}
                                onChange={handleChange}
                                minLength={10}
                                required
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirmer le mot de passe"
                                className="p-2 bg-gray-200 rounded"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Informations entreprise */}
                    <div className="border-2 border-purple-500 rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-4">Informations entreprise</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="entrepriseNom"
                                placeholder="Nom de l'entreprise"
                                className="w-full p-2 bg-gray-200 rounded"
                                value={form.entrepriseNom}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="entrepriseEmail"
                                placeholder="Email de l'entreprise"
                                className="w-full p-2 bg-gray-200 rounded"
                                value={form.entrepriseEmail}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="entrepriseAdresse"
                                placeholder="Adresse de l'entreprise"
                                className="w-full p-2 bg-gray-200 rounded"
                                value={form.entrepriseAdresse}
                                onChange={handleChange}
                            />
                            <textarea
                                name="entrepriseDescription"
                                placeholder="Description de l'entreprise"
                                className="w-full p-2 bg-gray-200 rounded h-24"
                                value={form.entrepriseDescription}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition disabled:opacity-50"
                        >
                            {loading ? 'Inscription en cours...' : "INSCRIRE MON ENTREPRISE"}
                        </button>

                        <Link to="/" className="text-purple-600 hover:underline">
                            Retour a la connexion
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterEntreprise;
