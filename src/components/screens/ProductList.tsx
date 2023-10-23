import React from 'react';
import ProductItem from "../ProductItem";
import useProducts from "../../hooks/useProducts";
import Spinner from "../Spinner";

const ProductList = () => {
    const products = useProducts()

    return products.length == 0 ? <Spinner/> :
        <div className="flex flex-wrap justify-center items-center">
            {products.map((item) => <ProductItem item={item} key={item.name}/>)}
        </div>;
}

export default ProductList
