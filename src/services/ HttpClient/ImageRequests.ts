import {baseUrl} from "./BaseRequests";

export const saveImage = async (img: File) => {
    try {
        const formData = new FormData();
        formData.append('image', img);

        const response = await fetch(`${baseUrl}SaveImage`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            return await response.json() as string;
        }
    } catch (error) {
        console.error('Error saving image:', error);
    }
    return undefined;
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