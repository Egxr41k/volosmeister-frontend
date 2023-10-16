import {baseUrl} from "./BaseRequests";

export const saveImage = (img: File) => {
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
        request.onerror = () => {
            reject(request.response)
        }
        request.send(formData);
    });
}

export const checkImageExisting = async (imageSrc: string) =>
    imageSrc != "" ? (await fetch(imageSrc)).ok : false

export const deleteImage = async (id: number) => {
    const response = await fetch(`${baseUrl}DeleteImage/${id}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json"
        }
    })
    return response.ok
}