import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {ProductList} from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import {NavBar} from "./components/NavBar";

function App() {
    return (
        <>
            <NavBar/>
            <div className="bg-fuchsia-200">
                <ProductList/>
            </div>
        </>
    );
}

export default App;
