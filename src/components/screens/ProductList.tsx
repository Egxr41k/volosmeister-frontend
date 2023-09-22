import React, { useState, useEffect } from 'react';
import ProductItem from "../ProductItem";
import {emptyProduct, IProduct} from "../../types/IProduct";
import {RequestHandler} from "../../services/RequestHandler";
import ProductForm from "../ProductForm";
import {ProductDetails} from "./ProductDetails";


export const ProductList = () => {
    const [data, setData] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const getProducts = async () =>{
        let products = await RequestHandler().fetchAll()
        setData(products)
    }

    useEffect(() => {
        //getProducts()
    }, []);
    return <div className="flex flex-wrap justify-center">
        {data.map((item: IProduct) => <ProductItem item={item}/>)}
        <ProductForm/>
    </div>;
}