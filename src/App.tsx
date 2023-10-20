import React from 'react';
import './App.css';
import {CurrentScreen} from "./components/Navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {CartProvider} from "./context/CartContext";
import {AdminProvider} from "./context/AdminContext";

function App() {
    return <CartProvider>
        <AdminProvider>
            <Header/>
            <main className="bg-fuchsia-200 min-h-[90vh]">
                <CurrentScreen/>
            </main>
            <Footer/>
        </AdminProvider>
    </CartProvider>;
    
}

export default App;