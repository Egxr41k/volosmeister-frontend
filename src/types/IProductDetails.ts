import {IFeature} from "./IFeature";
import {IProperty} from "./IProperty";
import {IProduct} from "./IProduct";

export interface IProductDetails {
    id: number,
    features: IFeature[],
    stats: IProperty[],
}
export const emptyDetails: IProductDetails = {
    id: 0,
    features: [],
    stats: []
}
// {
//     "id": 0,
//     "features": [
//     {
//         "id": 0,
//         "productId": 0,
//         "title": "string",
//         "imageSrc": "string",
//         "description": "string"
//     }
// ],
//     "stats": [
//     {
//         "id": 0,
//         "productId": 0,
//         "name": "string",
//         "value": "string"
//     }
// ]
// }