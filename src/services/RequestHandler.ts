import {IProductDetails} from "../types/IProductDetails";
import {IProduct} from "../types/IProduct";

const baseUrl = "https://localhost:7128/"
export function RequestHandler()  {
    return {
        fetchAll: async() => {
            const response = await fetch(baseUrl);
            return await response.json();
        },
        fetchById: async(id: number): Promise<IProductDetails> => {
            const response = await fetch(baseUrl + `/${id}`)
            return await response.json() as IProductDetails;
        },
        create: async(newEntity: IProduct) => {
            const response= await fetch(
                `${baseUrl}api/Products`, {
                    method: 'POST',
                    body: JSON.stringify(newEntity),
                    headers: {
                        "content-type": "application/json"
                    }
                })
            return await response.json() as IProduct
        },
        update: (id: number, updateEntity: IProduct) => { //IProduct

        },
        delete: (id: number) => { //IProduct

        }
    }
}