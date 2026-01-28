import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const PendingApproval = () => {
    const { user, logout, isPending, isRejected } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                <img src="/logo.png" alt="Logo" className="h-20 mx-auto mb-6" />

                {isPending && (
                    <>
                        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-6">
                            <svg className="w-12 h-12 mx-auto mb-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h2 className="text-xl font-semibold mb-2">Compte en attente de validation</h2>
                            <p className="text-sm">
                                Votre compte est en cours de verification par notre equipe.
                                Vous recevrez une notification une fois votre compte valide.
                            </p>
                        </div>
                    </>
                )}

                {isRejected && (
                    <>
                        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
                            <svg className="w-12 h-12 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h2 className="text-xl font-semibold mb-2">Compte rejete</h2>
                            <p className="text-sm mb-2">
                                Votre demande d'inscription a ete rejetee.
                            </p>
                            {user?.rejectionReason && (
                                <div className="bg-red-200 p-3 rounded mt-3">
                                    <p className="text-sm font-medium">Motif :</p>
                                    <p className="text-sm">{user.rejectionReason}</p>
                                </div>
                            )}
                        </div>
                    </>
                )}

                <button
                    onClick={handleLogout}
                    className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition"
                >
                    Se deconnecter
                </button>
            </div>
        </div>
    );
};

export default PendingApproval;
