import React, {useEffect, useState} from 'react';
import './App.css';
import {CurrentScreen, NavBar} from "./components/NavBar";
import {Header} from "./components/Header";

function App() {
    return (
        <>
            <Header/>
            <div className="bg-fuchsia-200 px-40">
                {CurrentScreen()}
            </div>
        </>

    );
}

export default App;
