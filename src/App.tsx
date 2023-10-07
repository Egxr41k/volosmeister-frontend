import React, {useEffect, useState} from 'react';
import './App.css';
import {CurrentScreen, Navigation} from "./components/Navigation";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {IProduct} from "./types/IProduct";
import {CartProvider} from "./context/CartContext";
import HttpClient from "./services/HttpClient";
import {AdminProvider} from "./context/AdminContext";

export const storeItems: IProduct[] = await HttpClient().getProducts()

function App() {
    return <CartProvider>
        <AdminProvider>
            <Header/>
            <div className="bg-fuchsia-200 min-h-[90vh]">
                <CurrentScreen/>
            </div>
            <Footer/>
        </AdminProvider>
    </CartProvider>;
}

export default App;
