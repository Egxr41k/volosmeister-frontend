import IProduct, {emptyProduct} from "./IProduct";
import IProductDetails, {emptyDetails} from "./IProductDetails";

interface IProductInfo{
    product: IProduct,
    details: IProductDetails
}
export const emptyInfo: IProductInfo = {
    details: emptyDetails,
    product: emptyProduct
}

export default IProductInfo