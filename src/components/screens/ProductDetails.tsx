
import {useEffect, useState} from "react";
import HttpClient from "../../services/HttpClient";
import {storeItems} from "../../App";
import {useAdmin} from "../../hooks/useAdmin";
import ProductForm from "../ProductForm";
import {emptyInfo} from "../../types/IProductInfo";

export const ProductDetails = ({id}:{id:number}) => {
    const { isAdmin} = useAdmin()
    const [productInfo, setProductInfo] = useState(emptyInfo)

    useEffect(() => {
        console.log("ProductDetails component mount")
        getProductInfo()
    }, []);

    const getProductInfo = async () => {
        const productResult =  await HttpClient().getProduct(id)
        const detailsResult = await HttpClient().getDetails(id)

        setProductInfo(prevState => ({
            product: productResult ?? prevState.product,
            details: detailsResult ?? prevState.details,
        }))
    }

    return <div className="flex">{ productInfo != emptyInfo ?
        isAdmin ?
            <ProductForm existingProductInfo={productInfo} /> :
            <></> :
        <></>}
    </div>
}