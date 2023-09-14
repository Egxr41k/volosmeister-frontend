import {IFeature} from "./IFeature";
import {IProperty} from "./IProperty";
import {IProduct} from "./IProduct";

export interface IProductDetails extends IProduct{
    features: IFeature[],
    stats: IProperty[],
}