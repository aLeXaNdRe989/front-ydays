import React from "react";

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-4 text-center text-sm">
            <div className="flex justify-center gap-4 mb-2">
                <a href="https://www.facebook.com/?locale=fr_FR" target="_blank" className="hover:underline">Facebook</a>
                <a href="https://www.instagram.com/" target="_blank" className="hover:underline">LinkedIn</a>
                <a href="https://www.linkedin.com/" target="_blank" className="hover:underline">Instagram</a>
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
                <span>CONTACT</span>|
                <span>POLITIQUE DE CONFIDENTIALITÉ</span>|
                <span>MENTIONS LÉGALES ET CGV</span>
            </div>
        </footer>
    );
}

export default Footer;