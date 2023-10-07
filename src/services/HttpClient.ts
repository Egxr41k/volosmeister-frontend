import {IProductDetails} from "../types/IProductDetails";
import {IProduct} from "../types/IProduct";

const baseUrl = "https://localhost:7128/"
const HttpClient = () =>  {
    return {
        getProducts: async() => {
            const response = await fetch(`${baseUrl}api/Products`);
            return await response.json() as IProduct[];
        },

        createProduct: async(newEntity: IProduct) => {
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

        updateProduct: async (updateEntity: IProduct) => { //IProduct
            const response= await fetch(
                `${baseUrl}api/Products/${updateEntity.id}`, {
                method: 'PUT',
                body: JSON.stringify(updateEntity),
                headers: {
                    "content-type": "application/json"
                }
            })
            return await response.json() as IProduct;
        },

        deleteProduct: async (id: number) => { //IProduct
            const response= await fetch(`${baseUrl}api/Products/${id}`, {
                method: 'DELETE',
                headers: {
                    "content-type": "application/json"
                }
            })
        },

        // getDetails: async(id: number): Promise<IProductDetails> => {
        //     const response = await fetch(`${baseUrl}api/Details/${id}`)
        //     return await response.json() as IProductDetails;
        // },

        // createDetails: () => {
        //
        // },

        // updateDetails: async(updateEntity: IProductDetails) => {
        //     const response= await fetch(
        //         `${baseUrl}api/Details/${updateEntity.id}`, {
        //             method: 'PUT',
        //             body: JSON.stringify(updateEntity),
        //             headers: {
        //                 "content-type": "application/json"
        //             }
        //         })
        //     return await response.json() as IProductDetails;
        // },

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

        checkImageExisting: async (imageSrc: string) => (await fetch(imageSrc)).ok
    }
}

export default HttpClient