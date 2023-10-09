
import {useEffect, useState} from "react";
import HttpClient from "../../services/HttpClient";
import {storeItems} from "../../App";
import {useAdmin} from "../../hooks/useAdmin";
import ProductForm from "../ProductForm";
import {emptyInfo} from "../../types/IProductInfo";
import useProductInfo from "../../hooks/useProductInfo";

export const ProductDetails = ({id}:{id:number}) => {
    const { isAdmin} = useAdmin()
    const {
        productInfo,
        request,
    } = useProductInfo(emptyInfo)

    useEffect(() => {
        console.log("ProductDetails component mount")
        request.getProductInfo(id)
    }, [])

    return <div className="flex">{ productInfo != emptyInfo ?
        isAdmin ?
            <ProductForm existingProductInfo={productInfo} /> :
            <></> :
        <></>}
    </div>
}