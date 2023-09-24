import React, {useEffect, useState} from "react";
import {emptyProduct, IProduct} from "../types/IProduct";
import {RequestHandler} from "../services/RequestHandler";
import {FilledBtn} from "./Btns";
import DetailsForm from "./DetailsForm";
import {IProductDetails} from "../types/IProductDetails";

const ProductForm = ({productToUpdate, detailsToUpdate}: {
    productToUpdate?: IProduct, detailsToUpdate?: IProductDetails}) => {

    const [product, setProduct] = useState(productToUpdate ?? emptyProduct)
    const [selectedImage, setSelectedImage] = useState<File>();
    const [details, setDetails] = useState<IProductDetails>(detailsToUpdate ??
        {features: [], id: 0, stats: []})
    useEffect(() =>{
        setProduct(productToUpdate ?? emptyProduct)
        setDetails(detailsToUpdate ??
            {features: [], id: 0, stats: []})
    }, [productToUpdate, detailsToUpdate]);
    const createProduct = async (e:any)  => {
        e.preventDefault()
        if (selectedImage) {
            RequestHandler()
                .saveImage(selectedImage)
                .then(response => {
                    setProduct(prevState => ({
                        ...prevState, imageSrc: response as string
                    }))
                })
        }
        const result = await RequestHandler().create(product)
        alert("продукт успішно доданий")
        setProduct(emptyProduct)
    }
    const updateProduct = async (e:any)  => {
        e.preventDefault()
        alert("продукт успішно оновлений")
    }

    return <div className="w-80 h-160 bg-fuchsia-50 mx-10 my-5">
        <img src={selectedImage ? URL.createObjectURL(selectedImage) :
            "/NO_PHOTO_YET.png"}
             alt="Selected image"
             className="w-full h-72 object-cover"/>
        <form className="h-64 p-6" encType="multipart/form-data" method="post">
            <h2 className="text-xl font-semibold">Додати товар</h2>
            <input type="file" id="fileInput" accept=".jpg"
                   className="block w-full my-2 text-sm text-gray-500
                       file:ease-in-out file:duration-300
                       file:mr-4 file:py-2 file:px-4 file:rounded-md
                       file:border-0 file:text-sm file:font-semibold
                       file:bg-black file:text-white
                       hover:file:bg-fuchsia-600 "
                   onChange={event => {
                       setSelectedImage(event.target.files?.[0])
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
                {/*продукт до оновлення у наявності*/}
                <DetailsForm details={details} setDetails={setDetails}/>
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

