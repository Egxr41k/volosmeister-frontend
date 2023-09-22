import {IFeature} from "./IFeature";
import {IProperty} from "./IProperty";
import {IProduct} from "./IProduct";

export interface IProductDetails {
    id: number,
    features: IFeature[],
    stats: IProperty[],
}