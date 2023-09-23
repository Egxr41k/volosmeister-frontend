import {IProduct} from "../../types/IProduct";
import {IProductDetails} from "../../types/IProductDetails";
import {useEffect, useState} from "react";
import {RequestHandler} from "../../services/RequestHandler";
import {storeItems} from "../../App";
export const ProductDetails = ({id}:{id:number}) => {

    const [details, setDetails] = useState<IProductDetails>(
        {
            features: [],
            id: 0,
            stats: []
        })
    const [product, setProduct] = useState<IProduct>()
    const getDetails = async () =>{
        let response = await RequestHandler().fetchById(id)
        if (response) setDetails(response)
        console.log(details)
    }
    const getProduct = async ()=>{
        let product = storeItems.find(i => i.id === id)
        if (product) setProduct(product)
        console.log(product)
    }

    useEffect(() => {
        getDetails()
        getProduct()
    }, []);

    return <>{id}</>
}