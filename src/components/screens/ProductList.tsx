import React, { useState, useEffect } from 'react';
import ProductItem from "../ProductItem";
import {emptyProduct, IProduct} from "../../types/IProduct";
import HttpClient from "../../services/HttpClient";
import ProductForm from "../ProductForm";
import {ProductDetails} from "./ProductDetails";
import {storeItems} from "../../App";


export const ProductList = () => {
    return <div className="flex flex-wrap justify-center">
        {storeItems.map((item: IProduct) => <ProductItem item={item}/>)}
        <ProductForm/>
    </div>;
}