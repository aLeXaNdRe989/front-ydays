import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [register, setRegister] = useState({
        nomPrenom: '',
        telephone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', {
                email: loginEmail,
                password: loginPassword,
            });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert('Erreur de connexion');
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
                nom: register.nomPrenom.split(' ')[1],
                prenom: register.nomPrenom.split(' ')[0],
                email: register.email,
                password: register.password,
                role: 'candidat'
            });
            alert('Inscription réussie');
        } catch (err) {
            alert("Erreur lors de l'inscription");
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-8 font-sans">
            <img src="/logo.png" alt="Logo" className="h-40 my-6" />

            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12">
                {/* Connexion */}
                <div className="border-2 border-purple-500 rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-center">CONNEXION</h2>
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
                            placeholder="Nom et prénom"
                            className="p-2 bg-gray-200 rounded"
                            onChange={(e) => setRegister({ ...register, nomPrenom: e.target.value })}
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Numéro de téléphone"
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
                            placeholder="Créer un mot de passe"
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
                        <p className="text-xs text-gray-500">*10 caractères minimum</p>
                        <button className="bg-orange-500 text-white py-2 rounded font-bold hover:bg-orange-600 transition">M'INSCRIRE</button>
                    </form>
                </div>
            </div>

            <footer className="mt-10 text-center text-sm text-gray-600 border-t pt-6 w-full max-w-4xl">
                <div className="flex justify-center gap-4 mb-2">
                    <a href="#" className="text-blue-600">Facebook</a>
                    <a href="#" className="text-blue-400">LinkedIn</a>
                    <a href="#" className="text-pink-500">Instagram</a>
                </div>
                <p>CONTACT | POLITIQUE DE CONFIDENTIALITÉ | MENTIONS LÉGALES ET CGV</p>
            </footer>
        </div>
    );
};

export default LoginRegister;
