import React, { useState, useEffect } from 'react';
import ProductItem from "./ProductItem";
import {IProduct} from "../types/IProduct";
import {RequestHandler} from "../services/RequestHandler";
import ProductForm from "./ProductForm";


const ProductList = () => {
    const [data, setData] = useState([]);
    useEffect( () => {
        const getProducts = async () =>{
            let products = await RequestHandler().fetchAll()
            setData(products)
        }
        getProducts()
    }, []);
    return <div className="flex flex-wrap ">
        { data.map((item: IProduct) => <ProductItem item={item}/>) }
        <ProductForm/>
    </div>;
}
export default ProductList;