import React, { useState, useEffect } from 'react';
import ProductItem from "../ProductItem";
import IProduct, {emptyProduct} from "../../types/IProduct";
import ProductForm from "../ProductForm";
import {storeItems} from "../../App";
import {emptyDetails} from "../../types/IProductDetails";

const ProductList = () => {
    return <div className="flex flex-wrap justify-center">
        {storeItems.map((item: IProduct) => <ProductItem item={item}/>)}
        <ProductForm existingProductInfo={{product: emptyProduct, details: emptyDetails}}/>
    </div>;
}

export default ProductList