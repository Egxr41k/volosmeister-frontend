import {useEffect} from "react";
import useAdmin from "../../hooks/useAdmin";
import ProductForm from "../ProductForm";
import useProductInfo from "../../hooks/useProductInfo";
import {emptyInfo} from "../../types/IProductInfo";

const ProductDetails = ({id}:{id:number}) => {
    const { isAdmin} = useAdmin()
    const {
        productInfo,
        setInfo,
        request,
    } = useProductInfo()

    useEffect(() => {
        console.log("ProductDetails component mount")
        request.getProductInfo(id)
            .then(data => {
                if (data) {
                    setInfo(data.product, data.details)
                }
            })
    }, [])

    return <div className="flex">{ productInfo == emptyInfo ?
        <div className="flex items-center justify-center h-[90vh] w-full">
            <div className="relative">
                <div className="w-20 h-20 border-fuchsia-300 border-2 rounded-full"></div>
                <div className="w-20 h-20 border-fuchsia-500 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
            </div>
        </div> :
        <></>}
    </div>
}

export default ProductDetails