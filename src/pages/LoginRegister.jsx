import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const LoginRegister = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [register, setRegister] = useState({
        nomPrenom: '',
        telephone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        try {
            const user = await login(loginEmail, loginPassword);

            // Rediriger selon le statut d'approbation
            if (user.role === 'admin' || user.isApproved === 'approved') {
                navigate('/dashboard');
            } else {
                navigate('/pending-approval');
            }
        } catch (err) {
            setLoginError(err.response?.data?.msg || 'Erreur de connexion');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (register.password !== register.confirmPassword) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }
        try {
            await api.post('/auth/register', {
                nom: register.nomPrenom.split(' ')[1] || register.nomPrenom,
                prenom: register.nomPrenom.split(' ')[0],
                email: register.email,
                password: register.password,
                telephone: register.telephone,
                role: 'candidat'
            });
            alert('Inscription reussie ! Vous pouvez maintenant vous connecter.');
        } catch (err) {
            alert(err.response?.data?.msg || "Erreur lors de l'inscription");
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-8 font-sans">
            <img src="/logo.png" alt="Logo" className="h-40 my-6" />

            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12">
                {/* Connexion */}
                <div className="border-2 border-purple-500 rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-center">CONNEXION</h2>
                    {loginError && (
                        <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
                            {loginError}
                        </div>
                    )}
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Adresse mail"
                            className="p-2 bg-gray-200 rounded"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            className="p-2 bg-gray-200 rounded"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                        />
                        <button className="bg-orange-500 text-white py-2 rounded font-bold hover:bg-orange-600 transition">ME CONNECTER</button>
                    </form>
                </div>

                <div className="border-2 border-purple-500 rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-center">INSCRIPTION</h2>
                    <form onSubmit={handleRegister} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Nom et prenom"
                            className="p-2 bg-gray-200 rounded"
                            onChange={(e) => setRegister({ ...register, nomPrenom: e.target.value })}
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Numero de telephone"
                            className="p-2 bg-gray-200 rounded"
                            onChange={(e) => setRegister({ ...register, telephone: e.target.value })}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Adresse mail"
                            className="p-2 bg-gray-200 rounded"
                            onChange={(e) => setRegister({ ...register, email: e.target.value })}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Creer un mot de passe"
                            className="p-2 bg-gray-200 rounded"
                            minLength={10}
                            onChange={(e) => setRegister({ ...register, password: e.target.value })}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirmer le mot de passe"
                            className="p-2 bg-gray-200 rounded"
                            onChange={(e) => setRegister({ ...register, confirmPassword: e.target.value })}
                            required
                        />
                        <p className="text-xs text-gray-500">*10 caracteres minimum</p>
                        <button className="bg-orange-500 text-white py-2 rounded font-bold hover:bg-orange-600 transition">M'INSCRIRE</button>
                    </form>
                </div>
            </div>

            {/* Lien inscription entreprise */}
            <div className="mt-8 text-center">
                <p className="text-gray-600 mb-2">Vous representez une entreprise ?</p>
                <Link
                    to="/register-entreprise"
                    className="text-purple-600 font-semibold hover:underline"
                >
                    Inscrivez votre entreprise
                </Link>
            </div>
        </div>
    );
};

export default LoginRegister;
