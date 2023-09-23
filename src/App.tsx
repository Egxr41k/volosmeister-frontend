import React, {useEffect, useState} from 'react';
import './App.css';
import {CurrentScreen, Navigation} from "./components/Navigation";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {IProduct} from "./types/IProduct";
import {ShoppingCartProvider} from "./context/ShoppingCartContext";
import {RequestHandler} from "./services/RequestHandler";

export const storeItems: IProduct[] = await RequestHandler().fetchAll()

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
