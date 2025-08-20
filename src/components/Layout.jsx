import React from "react";
import {Outlet, useLocation} from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header.jsx";

export default function Layout() {
    const location = useLocation();

    const hideHeaderOn = ["/"];
    const shouldHideHeader = hideHeaderOn.includes(location.pathname);
    return (
        <>
            {!shouldHideHeader && <Header />}

            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}