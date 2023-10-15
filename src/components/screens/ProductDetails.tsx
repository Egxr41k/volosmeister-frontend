import {useEffect} from "react";
import useAdmin from "../../hooks/useAdmin";
import ProductForm from "../ProductForm";
import useProductInfo from "../../hooks/useProductInfo";
import {emptyInfo} from "../../types/IProductInfo";

const ProductDetails = ({id}:{id:number}) => {
    const { isAdmin} = useAdmin()
    const {
        productInfo,
        request,
    } = useProductInfo(emptyInfo)

    useEffect(() => {
        console.log("ProductDetails component mount")
        request.getProductInfo(id).then()
    }, [])

    return <div className="flex">{ productInfo != emptyInfo ?
        isAdmin ? <ProductForm existingProductInfo={productInfo} /> :
            <></> :
        <></>}
    </div>
}

export default ProductDetails