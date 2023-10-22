import React from 'react';
import ProductItem from "../ProductItem";
import useProducts from "../../hooks/useProducts";
import Spinner from "../Spinner";

const ProductList = () => {
    const products = useProducts()

    return <div className="flex flex-wrap justify-center">
        {products.length == 0 ?  <Spinner/> :
        products.map((item) => <ProductItem item={item} key={item.name}/>)}
    </div>;
}

export default ProductList
