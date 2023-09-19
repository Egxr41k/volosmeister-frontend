import React, {useEffect, useState} from 'react';
import './App.css';
import {CurrentScreen, NavBar} from "./components/NavBar";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";



function App() {
    return (
        <>
            <Header/>
            <div className="bg-fuchsia-200 px-40 min-h-screen">
                {CurrentScreen()}
            </div>
            <Footer/>
        </>

    );
}

export default App;
