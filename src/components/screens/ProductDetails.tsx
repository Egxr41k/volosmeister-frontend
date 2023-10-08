import {emptyProduct, IProduct} from "../../types/IProduct";
import {emptyDetails, IProductDetails} from "../../types/IProductDetails";
import {useEffect, useState} from "react";
import HttpClient from "../../services/HttpClient";
import {storeItems} from "../../App";
import {useAdmin} from "../../hooks/useAdmin";
import DetailsForm from "../DetailsForm";
import ProductForm from "../ProductForm";

export interface IProductInfo{
    product: IProduct,
    details: IProductDetails
}

export const ProductDetails = ({id}:{id:number}) => {
    const { isAdmin} = useAdmin()
    const [productInfo, setProductInfo] = useState<IProductInfo>(
        {product: emptyProduct, details: emptyDetails})

    useEffect(() => {
        console.log("ProductDetails component render")
    });

    const getDetails = () =>{
        const detailsResult = HttpClient().getDetails(id)
        detailsResult.then(result => {
            if(result) {
                setProductInfo(prevState => ({
                    ...prevState, details: result
                }))
            }
        })
    }
    const getProduct = ()=> {
        const productResult = HttpClient().getProduct(id)
        productResult.then(result => {
            if(result) {
                setProductInfo(prevState => ({
                    ...prevState, product: result
                }))
            }
        })
    }

    const getProductInfo = () => {
        getProduct()
        getDetails()
    }

    useEffect(() => {
        getProductInfo()
        console.log(productInfo)
    }, []);

    return <div className="flex">{isAdmin ?
        <ProductForm existingProductInfo={productInfo} /> :
        <>
        </>}
    </div>
}