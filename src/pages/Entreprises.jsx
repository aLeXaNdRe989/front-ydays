import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icons not displaying
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import {useNavigate} from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const EntreprisesPage = () => {
    const [entreprises, setEntreprises] = useState([]);
    const [filters, setFilters] = useState({ ville: '', salaire: '', competence: '', avis: '' });

    useEffect(() => {
        const fetchEntreprises = async () => {
            try {
                const token = localStorage.getItem('token');

                const res = await axios.get('http://localhost:3000/api/entreprises', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = res.data;

                const geocoded = await Promise.all(
                    data.map(async (e) => {
                        if (!e.adresse) return e;
                        try {
                            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(e.adresse)}`);
                            const result = await response.json();
                            if (result.length > 0) {
                                const { lat, lon } = result[0];
                                return { ...e, position: { lat: parseFloat(lat), lng: parseFloat(lon) } };
                            }
                        } catch (error) {
                            console.error('Erreur geocodage :', error);
                        }
                        return e;
                    })
                );

                setEntreprises(geocoded);
            } catch (err) {
                console.error(err);
            }
        };

        fetchEntreprises();
    }, []);

    const filtered = entreprises;

    const handleFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="bg-gray-100 text-black">
            <section className="flex flex-col items-center py-6">

                <div className="w-full max-w-4xl h-[400px]">
                    <MapContainer center={[46.603354, 1.888334]} zoom={6} scrollWheelZoom={false} className="h-full w-full z-0">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {filtered.map((e, index) => (
                            e.position && (
                                <Marker key={index} position={[e.position.lat, e.position.lng]}>
                                    <Popup>
                                        <strong>{e.nom}</strong><br />
                                        {e.ville}<br />
                                    </Popup>
                                </Marker>
                            )
                        ))}
                    </MapContainer>
                </div>
            </section>

            {/* Résultats */}
            <section className="bg-white py-4 px-6">
                <h2 className="text-center font-bold text-lg bg-orange-500 text-white py-2 mb-6">LES ENTREPRISES</h2>

                {filtered.map((e, index) => (
                    <div key={index} className="border-2 border-orange-500 mb-4 p-4 rounded-lg">
                        <div className="flex flex-col md:flex-row items-center md:justify-between text-center gap-2">
                            {/* Nom */}
                            <div className="md:flex-1 text-center">
                                <p className="font-bold text-lg uppercase">{e.nom}</p>
                            </div>

                            {/* Ville */}
                            <div className="md:flex-1 text-center">
                                <p className="text-sm uppercase">{e.ville}</p>
                            </div>

                            {/* Étoiles */}
                            <div className="md:flex-1 flex justify-center">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < e.avis ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                                ))}
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 mt-1">{e.competence}</p>
                    </div>
                ))}

                <div className="text-center">
                    <button className="bg-orange-500 text-white font-bold px-6 py-2 rounded-full mt-4">PLUS</button>
                </div>
            </section>
        </div>
    );
};

export default EntreprisesPage;