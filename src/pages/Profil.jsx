import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profil = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:3000/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => {
                    setUser(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setError("Impossible de récupérer l'utilisateur.");
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setError("Aucun token trouvé.");
        }
    }, []);

    if (!user) return <div className="text-center p-4">Chargement...</div>;

    return (
        <div className="bg-gray-100 text-black min-h-screen">

            <h2 className="text-center text-lg font-bold mt-4">MATCHEZ AVEC VOTRE AVENIR</h2>

            {/* Profil */}
            <section className="bg-white m-4 p-4 rounded border-2 border-orange-500">
                <h3 className="text-center font-bold mb-4">TABLEAU DE BORD</h3>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex flex-col items-center">
                        <div className="bg-gray-200 w-32 h-32 flex items-center justify-center text-3xl rounded-full">+</div>
                        <input type="file" className="mt-2 text-sm" />
                        <button className="mt-4 bg-orange-500 text-white px-4 py-1 rounded">MODIFIER MON PROFIL</button>
                    </div>
                    <div className="grid grid-cols-1 gap-2 w-full">
                        <input placeholder="Nom et prénom" className="bg-gray-200 p-2 rounded" defaultValue={user.nom} />
                        <input placeholder="Adresse mail" className="bg-gray-200 p-2 rounded" defaultValue={user.email} />
                        <input placeholder="Numéro de téléphone" className="bg-gray-200 p-2 rounded" />
                        <input placeholder="CV" className="bg-gray-200 p-2 rounded" />
                        <input placeholder="Lettre de motivation / Portfolio" className="bg-gray-200 p-2 rounded" />
                        <input placeholder="Lien du CV vidéo" className="bg-gray-200 p-2 rounded" />
                        <input placeholder="Mot de passe actuel" className="bg-gray-200 p-2 rounded" type="password" />
                        <input placeholder="Nouveau mot de passe" className="bg-gray-200 p-2 rounded" type="password" />
                    </div>
                </div>
            </section>

            {/* Sections dynamiques selon le rôle */}
            {user.role === 'candidat' && (
                <>
                    {/* Consultées */}
                    <section className="bg-white m-4 p-4 rounded border-2 border-purple-500">
                        <h3 className="font-bold">ENTREPRISES CONSULTÉES :</h3>
                        <div className="flex gap-4 mt-2">
                            {/* Placeholder entreprise cards */}
                            <div className="border border-purple-500 p-2">Ynov Campus</div>
                            <div className="border border-purple-500 p-2">Dell</div>
                        </div>
                    </section>

                    {/* Notées */}
                    <section className="bg-white m-4 p-4 rounded border-2 border-purple-500">
                        <h3 className="font-bold">ENTREPRISES NOTÉES :</h3>
                        <div className="flex gap-4 mt-2">
                            <div className="border border-purple-500 p-2">Ubisoft</div>
                        </div>
                    </section>

                    {/* Avis */}
                    <section className="bg-orange-200 m-4 p-4 rounded border-2 border-orange-500">
                        <h3 className="font-bold">DONNER UN AVIS :</h3>
                        <input placeholder="Nom entreprise" className="bg-orange-100 p-2 w-full my-2 rounded" />
                        <div className="flex gap-2 mb-2">
                            <label className="flex items-center gap-1">
                                <input type="radio" name="contrat" /> Apprentissage
                            </label>
                            <label className="flex items-center gap-1">
                                <input type="radio" name="contrat" /> Stage
                            </label>
                            <input placeholder="Poste occupé" className="bg-orange-100 p-2 flex-1 rounded" />
                        </div>
                        <textarea className="bg-orange-100 w-full h-32 p-2 rounded mb-2" placeholder="Avis..." />
                        <div className="flex justify-center text-xl mb-2">⭐⭐⭐⭐☆</div>
                        <button className="bg-orange-500 text-white px-4 py-2 rounded w-full">ENREGISTRER</button>
                    </section>
                </>
            )}
        </div>
    );
};

export default Profil;
