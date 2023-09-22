import React, {useEffect, useState} from 'react';
import './App.css';
import {CurrentScreen, NavBar} from "./components/NavBar";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {IProduct} from "./types/IProduct";
import {ShoppingCartProvider} from "./context/ShoppingCartContext";

export const storeItems: IProduct[] = [
    {
        "id": 6,
        "name": "ПАЛИЧКИ SANI STIKS!",
        "imageSrc": "https://static.tildacdn.com/tild3137-6635-4664-b362-363464666638/IMG_20230702_004919_.jpg",
        "description": "ДЛЯ ЧИЩЕННЯ ЗАСМІЧЕНЬ ЗЛИВУ РАКОВИНИ ТА КАНАЛІЗАЦІЇ!",
        "count": 10,
        "isAvailable": true,
        "newPrice": 199,
        "oldPrice": 329,
        "isSale": false
    }
]

function App() {
    return <ShoppingCartProvider>
        <Header/>
        <div className="bg-fuchsia-200 min-h-[90vh]">
            {CurrentScreen()}
        </div>
        <Footer/>
    </ShoppingCartProvider>;
}

export default App;
