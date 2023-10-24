import React from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {CartProvider} from "./context/CartContext";
import {AdminProvider} from "./context/AdminContext";
import {BrowserRouter} from "react-router-dom";
import {CurrentScreen} from "./components/Navigation";

function App() {
    return <BrowserRouter>
        <CartProvider>
            <AdminProvider>
                <Header/>
                <main className="bg-fuchsia-200 min-h-[90vh]">
                    <CurrentScreen/>
                </main>
                <Footer/>
            </AdminProvider>
        </CartProvider>
    </BrowserRouter>;
}

export default App;