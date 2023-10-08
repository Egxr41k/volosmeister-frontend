import {emptyProduct, IProduct} from "../../types/IProduct";
import {emptyDetails, IProductDetails} from "../../types/IProductDetails";
import {useEffect, useState} from "react";
import HttpClient from "../../services/HttpClient";
import {storeItems} from "../../App";
import {useAdmin} from "../../hooks/useAdmin";
import DetailsForm from "../DetailsForm";
import ProductForm from "../ProductForm";
export const ProductDetails = ({id}:{id:number}) => {
    const { isAdmin} = useAdmin()
    const [details, setDetails] = useState(emptyDetails)
    const [product, setProduct] = useState(emptyProduct)

    useEffect(() => {
        console.log("ProductDetails component render")
    }, []);

    const getDetails = () =>{
        const response = HttpClient().getDetails(id)
        response.then(details => {
            if(details) setDetails(details)
        })
    }
    const getProduct = ()=> {
        const response = HttpClient().getProduct(id)
        response.then(product =>{
            if(product) setProduct(product)
        })
    }

    useEffect(() => {
        getDetails()
        getProduct()
        console.log(product, details)
    }, []);

    return <div className="flex">{isAdmin ?
        <ProductForm productToUpdate={product}/> :
        <>
        </>}
    </div>
}