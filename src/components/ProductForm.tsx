import React, {useEffect, useState} from "react";
import {emptyProduct, IProduct} from "../types/IProduct";
import {RequestHandler} from "../services/RequestHandler";
import {FilledBtn} from "./Btns";
import DetailsForm from "./DetailsForm";
import {IProductDetails} from "../types/IProductDetails";

const ProductForm = ({productToUpdate, detailsToUpdate}: {
    productToUpdate?: IProduct, detailsToUpdate?: IProductDetails}) => {

    const [product, setProduct] = useState(productToUpdate ?? emptyProduct)
    const [images, setImages] = useState<(File | undefined)[]>([]);
    const [details, setDetails] = useState<IProductDetails>(detailsToUpdate ??
        {features: [], id: 0, stats: []})
    const [isProductImageExist, setIsProductImageExist] = useState(false)

    useEffect(() => {
        setProduct(productToUpdate ?? emptyProduct)
        setDetails(detailsToUpdate ??
            {features: [], id: 0, stats: []})
    }, [productToUpdate, detailsToUpdate]);

    useEffect(() => {
        const checkImageExist = async () => {
            const result = await RequestHandler().checkIsImageExist(product.imageSrc);
            setIsProductImageExist(result);
            console.log(product.imageSrc)
            console.log(result)
            console.log(isProductImageExist)
        };

        checkImageExist();
    }, [product.imageSrc]);

    const addImage = (image: File | undefined) => {
        if (image) {
            setImages(prevState => [
                image, ...prevState
            ])
        } else return
    }

    const createProduct = async (e:any)  => {
        e.preventDefault()
        const result = await RequestHandler().create(product)
        alert("продукт успішно доданий")
        setProduct(emptyProduct)
    }
    const updateProduct = async (e:any)  => {
        e.preventDefault()
        console.log(images)
        await setImagesSrc()

        console.log(product);
        if (productToUpdate != product){
            console.log("product put request is sent")
            const result = RequestHandler().update(product.id, product)
        }

        console.log(details);
        if (details !== detailsToUpdate) {
            console.log("details put request is sent")
            const result = RequestHandler().updateDetails(product.id, details)
        }
    }

    const setImagesSrc = async () => {
        let imagesSrc = await initImagesSrc()

        setProduct(prevState => ({
            ...prevState, imageSrc: imagesSrc[0]
        }))

    }

    const initImagesSrc = async () => {
        let imagesSrc: string[] = [];
        if (isProductImageExist) imagesSrc.push(product.imageSrc)
        for (let image of images) {
            if (image) {
                const response = await RequestHandler().saveImage(image!)
                console.log(response)
                imagesSrc.push(response as string)
            }
        }
        return imagesSrc
    }

    return <div className="w-80 h-[80vh] overflow-y-auto bg-fuchsia-50 mx-10 my-5">
        <img src={images[0] ?
                URL.createObjectURL(images[0]!):
                isProductImageExist ?
                    product.imageSrc:
                        "/NO_PHOTO_YET.png"}

             alt="Selected image"
             className="w-full h-72 object-cover"/>
        <form className="h-64 p-5" encType="multipart/form-data" method="post"
              onSubmit={(event) => event.preventDefault()}>
            <h2 className="text-xl font-semibold">{ productToUpdate ? "Оновити товар" : "Додати товар" }</h2>
            <input type="file" id="fileInput" accept=".jpg"
                   className="block w-full my-2 text-sm text-gray-500
                       file:ease-in-out file:duration-300
                       file:mr-4 file:py-2 file:px-4 file:rounded-md
                       file:border-0 file:text-sm file:font-semibold
                       file:bg-black file:text-white
                       hover:file:bg-fuchsia-600 "
                   onChange={event => {
                       addImage(event.target.files?.[0])
                   }}/>

            <div className="flex flex-wrap justify-between">
                <input className="w-48 my-2" placeholder="назва" type="text"
                       onChange={event => {
                           setProduct(prevState => ({
                               ...prevState, name: event.target.value
                           }))
                       }} value={product.name}/>
                <input className="w-16 my-2" placeholder="кількість" type="number"
                       onChange={event => {
                           setProduct(prevState => ({
                               ...prevState,  count: parseInt(event.target.value), isAvailable: true
                           }))
                       }} value={product.count}/>

                <input className="w-32 my-2" placeholder="стара ціна" type="number"
                       onChange={event => {
                           setProduct(prevState => ({
                               ...prevState,  oldPrice: parseInt(event.target.value), isSale: true
                           }))
                       }} value={product.oldPrice}/>

                <input className="w-32 my-2" placeholder="нова ціна" type="number"
                       onChange={event => {
                           setProduct(prevState => ({
                               ...prevState,  newPrice: parseInt(event.target.value)
                           }))
                       }} value={product.newPrice}/>
            </div>
            <textarea className="w-full h-20 my-2" placeholder="опис"
                      onChange={event => {
                          setProduct(prevState => ({
                              ...prevState, description: event.target.value
                          }))
                      }} value={product.description} />
            {productToUpdate && <>
                <DetailsForm details={details} setDetails={setDetails}
                images={images} setImages={setImages}/>
            </>}
            <FilledBtn handleClick={ productToUpdate ?
                async (event) => updateProduct(event) :
                async (event) => createProduct(event)}>
                { productToUpdate ? "Оновити" : "Додати"}
            </FilledBtn>
        </form>
    </div>
}
export default ProductForm