import React from 'react';
import ProductItem from "../ProductItem";
import IProduct, {emptyProduct} from "../../types/IProduct";
import ProductForm from "../ProductForm";
import {emptyDetails} from "../../types/IProductDetails";
import useProducts from "../../hooks/useProducts";
import useAdmin from "../../hooks/useAdmin";

const ProductList = () => {
    const products = useProducts()
    const { isAdmin} = useAdmin()

    return <div className="flex flex-wrap justify-center">
        {products.length == 0 ? <div className="flex items-center justify-center w-full">
            <div className="relative">
                <div className="w-20 h-20 border-fuchsia-300 border-2 rounded-full"></div>
                <div className="w-20 h-20 border-fuchsia-500 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
            </div>
        </div> :
        products.map((item: IProduct) => <ProductItem item={item} key={item.name}/>)}
        {isAdmin && <ProductForm existingProductInfo={{product: emptyProduct, details: emptyDetails}}/>}
    </div>;
}

export default ProductList
