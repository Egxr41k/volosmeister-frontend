import IProductDetails from "../types/IProductDetails";
import IProduct from "../types/IProduct";

const baseUrl = "https://localhost:7128/"
const HttpClient = () =>  {
    return {
        getProducts: async() => {
            const response = await fetch(`${baseUrl}api/Products`);
            if (response.ok) return await response.json() as IProduct[]
            else return [];
        },

        getProduct: async (id: number) => {
            const response= await fetch(`${baseUrl}api/Products/${id}`)
            if (response.ok) return await response.json() as IProduct
            else return undefined;
        },

        createProduct: async(newEntity: IProduct) => {
            const response= await fetch(`${baseUrl}api/Products`, {
                    method: 'POST',
                    body: JSON.stringify(newEntity),
                    headers: {
                        "content-type": "application/json"
                    }
                })
            if (response.ok) return await response.json() as IProduct
            else return undefined;
        },

        updateProduct: async (updateEntity: IProduct) => {
            const response= await fetch(
                `${baseUrl}api/Products/${updateEntity.id}`, {
                method: 'PUT',
                body: JSON.stringify(updateEntity),
                headers: {
                    "content-type": "application/json"
                }
            })
            if (response.ok) return await response.json() as IProduct
            else return undefined;
        },

        deleteProduct: async (id: number) => {
            const response= await fetch(`${baseUrl}api/Products/${id}`, {
                method: 'DELETE',
                headers: {
                    "content-type": "application/json"
                }
            })
            return response.ok
        },

        getDetails: async(id: number) => {
            const response = await fetch(`${baseUrl}api/Details/${id}`)
            if (response.ok) return await response.json() as IProductDetails;
            else return undefined;
        },

        createDetails: async (newEntity: IProductDetails) => {
            const response= await fetch(
                `${baseUrl}api/Details`, {
                    method: 'POST',
                    body: JSON.stringify(newEntity),
                    headers: {
                        "content-type": "application/json"
                    }
                })
            if (response.ok) return await response.json() as IProductDetails
            else return undefined;
        },

        updateDetails: async(updateEntity: IProductDetails) => {
            const response= await fetch(
                `${baseUrl}api/Details/${updateEntity.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(updateEntity),
                    headers: {
                        "content-type": "application/json"
                    }
                })
            if (response.ok) return await response.json() as IProductDetails
            else return undefined;
        },

        deleteDetails: async (id: number) => {
            const response= await fetch(`${baseUrl}api/Details/${id}`, {
                method: 'DELETE',
                headers: {
                    "content-type": "application/json"
                }
            })
            return response.ok
        },

        saveImage: (img: File ) => {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('image', img);
                console.log(formData)

                const request = new XMLHttpRequest();
                request.open("POST", `${baseUrl}SaveImage`, true);
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