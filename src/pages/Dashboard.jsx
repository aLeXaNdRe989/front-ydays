import React from 'react';
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const clickEntreprise = () => {
        navigate('/entreprises');
    }

    const clickOffres = () => {
        navigate('/offres');
    }

    const clickProfil = () => {
        navigate('/profil');
    }

    return (
        <div className="bg-gray-50 text-black font-sans">

            <section className="relative bg-cover bg-[center_bottom_15%] h-[450px]" style={{ backgroundImage: "url('/fond_dashboard.png')" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 flex justify-center items-center p-6">
                    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl max-w-xl text-center shadow-2xl">
                        <p className="text-gray-700 leading-relaxed">
                            Altern' Work - Le label qui garantit une experience d'alternance de qualite. Les entreprises labellisees s'engagent a offrir un environnement de travail bienveillant, un accompagnement personnalise, etc.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION C'EST QUOI */}
            <section className="text-center py-12 bg-white">
                <h2 className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 text-lg font-bold tracking-wide">
                    ALTERN' WORK C'EST QUOI ?
                </h2>
                <div className="my-8 px-4">
                    <div className="flex justify-center items-center">
                        <video
                            className="w-full max-w-3xl rounded-2xl shadow-xl"
                            src="/pres.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    </div>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={clickEntreprise}
                            className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-orange-600 hover:shadow-lg transition-all"
                        >
                            ENTREPRISE
                        </button>
                        <button
                            onClick={clickOffres}
                            className="bg-purple-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-600 hover:shadow-lg transition-all"
                        >
                            OFFRES D'ALTERNANCE
                        </button>
                    </div>
                </div>
            </section>

            {/* SECTION LABEL ENTREPRISES */}
            <section className="text-center py-6 bg-gray-50">
                <h2 className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 text-lg font-bold tracking-wide">
                    POUR LES ENTREPRISES<br />QUI DESIRENT NOTRE LABEL
                </h2>
            </section>

            {/* FORMULAIRE DE CONTACT */}
            <section className="bg-gray-50 flex justify-center py-12 px-4">
                <form className="bg-white border border-gray-200 p-8 rounded-2xl w-full max-w-md space-y-4 shadow-lg">
                    <input
                        type="text"
                        placeholder="Nom et prenom"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                    <input
                        type="text"
                        placeholder="Numero de telephone"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                    <input
                        type="email"
                        placeholder="Adresse mail"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                    <textarea
                        placeholder="Votre message"
                        rows="5"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        ENVOYER
                    </button>
                </form>
            </section>

            {/* EQUIPE */}
            <section className="py-12 bg-white text-center">
                <h2 className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 text-lg font-bold tracking-wide">
                    QUI SOMMES-NOUS ?
                </h2>
                <div className="grid md:grid-cols-4 gap-8 py-10 px-6 max-w-6xl mx-auto">
                    <div className="text-center group">
                        <img src="/nathan.png" alt="Nathan" className="mx-auto rounded-full h-28 w-28 object-cover shadow-md group-hover:shadow-lg transition-shadow" />
                        <p className="font-bold mt-4 text-gray-800">NATHAN PRIAN</p>
                        <p className="text-sm text-gray-500">Chef de projet</p>
                    </div>
                    <div className="text-center group">
                        <img src="/Collin.png" alt="Colin" className="mx-auto rounded-full h-28 w-28 object-cover shadow-md group-hover:shadow-lg transition-shadow" />
                        <p className="font-bold mt-4 text-gray-800">COLIN DURAND</p>
                        <p className="text-sm text-gray-500">Resp marketing / communication</p>
                    </div>
                    <div className="text-center group">
                        <img src="/Alex.png" alt="Alexandre" className="mx-auto rounded-full h-28 w-28 object-cover shadow-md group-hover:shadow-lg transition-shadow" />
                        <p className="font-bold mt-4 text-gray-800">ALEXANDRE PIRON</p>
                        <p className="text-sm text-gray-500">Tech & Developpement</p>
                    </div>
                    <div className="text-center group">
                        <img src="/Gael.png" alt="Carl" className="mx-auto rounded-full h-28 w-28 object-cover shadow-md group-hover:shadow-lg transition-shadow" />
                        <p className="font-bold mt-4 text-gray-800">CARL AUTEC</p>
                        <p className="text-sm text-gray-500">Resp commercial</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
