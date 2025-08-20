import React from 'react';
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const clickEntreprise = () => {
        navigate('/entreprises');
    }

    const clickProfil = () => {
        navigate('/profil');
    }

    return (
        <div className="bg-gray-100 text-black font-sans">

            <section className="relative bg-cover bg-[center_bottom_15%] h-[400px]" style={{ backgroundImage: "url('/fond_dashboard.png')" }}>
                <div className="absolute inset-0 bg-black/40 flex justify-center items-center p-6">
                    <div className="bg-white p-6 rounded-lg max-w-xl text-center shadow-lg">
                        <p>
                            Altern’ Work - Le label qui garantit une expérience d’alternance de qualité. Les entreprises labellisées s’engagent à offrir un environnement de travail bienveillant, un accompagnement personnalisé, etc.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION C'EST QUOI */}
            <section className="text-center py-8 bg-white">
                <h2 className="bg-orange-500 text-white py-2 text-lg font-bold">ALTERN’ WORK C’EST QUOI ?</h2>
                <div className="my-6">
                    <div className="flex justify-center items-center h-[50vh]">
                        <video
                            className="w-full max-w-3xl rounded-lg shadow-lg"
                            src="/pres.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    </div>
                    <div className="h-[5vh]"></div>
                    <button onClick={clickEntreprise} className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-orange-600">
                        ENTREPRISE
                    </button>
                </div>
            </section>

            {/* SECTION LABEL ENTREPRISES */}
            <section className="text-center py-4 bg-white">
                <h2 className="bg-orange-500 text-white py-2 text-lg font-bold">
                    POUR LES ENTREPRISES<br />QUI DÉSIRENT NOTRE LABEL
                </h2>
            </section>

            {/* FORMULAIRE DE CONTACT */}
            <section className="bg-white flex justify-center py-8">
                <form className="border-2 border-purple-500 p-6 rounded-lg w-full max-w-md space-y-4">
                    <input type="text" placeholder="Nom et prénom" className="w-full p-2 border rounded" />
                    <input type="text" placeholder="Numéro de téléphone" className="w-full p-2 border rounded" />
                    <input type="email" placeholder="Adresse mail" className="w-full p-2 border rounded" />
                    <textarea placeholder="Votre message" rows="5" className="w-full p-2 border rounded"></textarea>
                    <button type="submit" className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-orange-600">
                        ENVOYER
                    </button>
                </form>
            </section>

            {/* ÉQUIPE */}
            <section className="py-8 bg-white text-center">
                <h2 className="bg-orange-500 text-white py-2 text-lg font-bold">QUI SOMMES-NOUS ?</h2>
                <div className="grid md:grid-cols-4 gap-6 py-8 px-4">
                    <div className="text-center">
                        <img src="/nathan.png" alt="Nathan" className="mx-auto rounded-full h-24 w-24 object-cover" />
                        <p className="font-bold">NATHAN PRIAN</p>
                        <p className="text-sm">Chef de projet</p>
                    </div>
                    <div className="text-center">
                        <img src="/Collin.png" alt="Colin" className="mx-auto rounded-full h-24 w-24 object-cover" />
                        <p className="font-bold">COLIN DURAND</p>
                        <p className="text-sm">Resp marketing / communication</p>
                    </div>
                    <div className="text-center">
                        <img src="/Alex.png" alt="Alexandre" className="mx-auto rounded-full h-24 w-24 object-cover" />
                        <p className="font-bold">ALEXANDRE PIRON</p>
                        <p className="text-sm">Tech & Développement</p>
                    </div>
                    <div className="text-center">
                        <img src="/Gael.png" alt="Carl" className="mx-auto rounded-full h-24 w-24 object-cover" />
                        <p className="font-bold">CARL AUTEC</p>
                        <p className="text-sm">Resp commercial</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
