import {IProductDetails} from "../types/IProductDetails";
import {IProduct} from "../types/IProduct";

const baseUrl = "https://localhost:7128/"
export function RequestHandler()  {
    return {
        fetchAll: async() => {
            const response = await fetch(`${baseUrl}api/Products`);
            return await response.json();
        },
        fetchById: async(id: number): Promise<IProductDetails> => {
            const response = await fetch(`${baseUrl}api/Products/${id}`)
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

        },
        saveImage: (img: File ) => {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('image', img);
                console.log(formData)

                const request = new XMLHttpRequest();
                request.open("POST", "https://localhost:7128/SaveImage", true);
                request.responseType = 'json'

                request.onload = () => {
                    resolve(request.response)
                }
                request.onerror = ()=> {
                    reject(request.response)
                }
                request.send(formData);
            });
        },
    }
}