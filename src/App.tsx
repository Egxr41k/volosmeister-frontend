import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

function App() {
  return (
      <div className="bg-fuchsia-200 h-screen">
        <ProductForm/>
      </div>
  );
}

export default App;
