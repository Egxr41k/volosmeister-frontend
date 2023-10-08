import React, { useState, useEffect } from 'react';
import ProductItem from "../ProductItem";
import {emptyProduct, IProduct} from "../../types/IProduct";
import HttpClient from "../../services/HttpClient";
import ProductForm from "../ProductForm";
import {ProductDetails} from "./ProductDetails";
import {storeItems} from "../../App";
import {emptyDetails} from "../../types/IProductDetails";


export const ProductList = () => {
    return <div className="flex flex-wrap justify-center">
        {storeItems.map((item: IProduct) => <ProductItem item={item}/>)}
        <ProductForm existingProductInfo={{product: emptyProduct, details: emptyDetails}}/>
    </div>;
}