import {useEffect, useState} from "react";
import IProduct from "../types/IProduct";
import {getProducts} from "../services/ HttpClient/ProductRequests";

const useProducts = () => {
    const [products, setProducts] = useState([] as IProduct[])

    useEffect(() => {
        getProducts().then(result => {
            if (result?.length != 0) setProducts(result!)
        })
    }, []);

    return products
}

export default useProducts