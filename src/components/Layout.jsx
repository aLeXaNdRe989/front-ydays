import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header.jsx";

const hideHeaderOn = ["/LoginRegister"];
const shouldHideHeader = hideHeaderOn.includes(location.pathname);

export default function Layout() {
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