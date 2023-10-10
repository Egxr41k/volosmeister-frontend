import {useEffect, useState} from "react";
import IProduct from "../types/IProduct";
import HttpClient from "../services/HttpClient";

const useProducts = () => {
    const [products, setProducts] = useState([] as IProduct[])

    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        const productsResult = await HttpClient().getProducts()
        if (productsResult.length != 0) setProducts(productsResult)
    }
    return products
}

export default useProducts