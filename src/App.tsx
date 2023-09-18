import React, {useEffect, useState} from 'react';
import './App.css';
import {ProductList} from "./components/screens/ProductList";
import {NavBar} from "./components/NavBar";
import {Home} from "./components/screens/Home";

function App() {
    let component: React.JSX.Element = <Home/>
    switch (window.location.pathname){
        case "/Home":
            component = <Home/>
            break
        case "/ProductList":
            component = <ProductList/>
            break
        case "/About":
            //component = <Home/>
            break
        case "/Contacts":

            //component = <Home/>
            break
    }
    return (
        <>
            <NavBar/>
            <div className="bg-fuchsia-200">
                {component}
            </div>
        </>
    );
}

export default App;
