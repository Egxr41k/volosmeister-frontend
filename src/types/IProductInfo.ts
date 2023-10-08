import {emptyProduct, IProduct} from "./IProduct";
import {emptyDetails, IProductDetails} from "./IProductDetails";

export interface IProductInfo{
    product: IProduct,
    details: IProductDetails
}
export const emptyInfo: IProductInfo = {
    details: emptyDetails,
    product: emptyProduct
}