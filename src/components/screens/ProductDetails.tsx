import {emptyProduct, IProduct} from "../../types/IProduct";
import {IProductDetails} from "../../types/IProductDetails";
import {useEffect, useState} from "react";
import {RequestHandler} from "../../services/RequestHandler";
import {storeItems} from "../../App";
import {useAdmin} from "../../hooks/useAdmin";
import DetailsForm from "../DetailsForm";
import ProductForm from "../ProductForm";
export const ProductDetails = ({id}:{id:number}) => {
    const { isAdmin} = useAdmin()
    const [details, setDetails] = useState<IProductDetails>(
        { features: [], id: 0, stats: []})
    const [product, setProduct] = useState<IProduct>(emptyProduct)
    const getDetails = () =>{
        let response = RequestHandler().getDetails(id)
        response.then(details => setDetails(details))
    }
    const getProduct = ()=> {
        let product = storeItems.find(i => i.id === id)
        if (product) setProduct(product)
    }

    useEffect(() => {
        //getDetails()
        getProduct()
        console.log(product, details)
    }, [product]);

    return <div className="flex">{isAdmin ?
        <ProductForm productToUpdate={product}/> :
        <>
        </>}
    </div>
}