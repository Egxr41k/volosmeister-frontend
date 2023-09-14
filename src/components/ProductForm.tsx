import React, {useState} from "react";
import {IProduct} from "../types/IProduct";
import {RequestHandler} from "../services/RequestHandler";
const ProductForm = () => {
    let emptyProduct: IProduct = {
        count: 0,
        description: "",
        id: 0,
        imageSrc: "",
        isAvailable: false,
        isSale: false,
        name: "",
        newPrice: 0,
        oldPrice: 0
    }
    const [product, setProduct] = useState(emptyProduct)
    const [selectedImage, setSelectedImage] = useState<File |  undefined>();

    const createProduct = async (e:any)  => {

    }
    return <div>
        <div className="w-5/6 bg-fuchsia-50 mx-auto p-6">
            <form className="h-2/5 " encType="multipart/form-data" method="post" >
                <h2 className="text-lg font-semibold my-2">Додати товар</h2>
                {selectedImage && (
                    <img src={URL.createObjectURL(selectedImage)} alt="Selected image"/>
                )}
                <input type="file" id="fileInput" accept=".jpg"
                       className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4 file:rounded-md
                       file:border-0 file:text-sm file:font-semibold
                       file:bg-black file:text-white
                       hover:file:bg-fuchsia-600"
                       onChange={event => {
                           setSelectedImage(event.target.files?.[0])
                       }}/>

                <div className="w-min block my-3">
                    <input className="w-max my-2" placeholder="назва" type="text"
                           onChange={event => {
                               setProduct(prevState => ({
                                   ...prevState, name: event.target.value
                               }))
                           }} value={product.name}/>

                    <input className="w-max my-2" placeholder="опис" type="text"
                           onChange={event => {
                               setProduct(prevState => ({
                                   ...prevState, description: event.target.value
                               }))
                           }} value={product.description} />

                    <input className="w-max my-2" placeholder="стара ціна" type="number"
                           onChange={event => {
                               setProduct(prevState => ({
                                   ...prevState,  oldPrice: parseInt(event.target.value), isSale: true
                               }))
                           }} value={product.oldPrice}/>

                    <input className="w-max my-2" placeholder="нова ціна" type="number"
                           onChange={event => {
                               setProduct(prevState => ({
                                   ...prevState,  newPrice: parseInt(event.target.value)
                               }))
                           }} value={product.newPrice}/>

                    <input className="w-max my-2" placeholder="кількість" type="number"
                           onChange={event => {
                               setProduct(prevState => ({
                                   ...prevState,  count: parseInt(event.target.value), isAvailable: true
                               }))
                           }} value={product.count}/>
                </div>
                <button className="h-2/10 font-semibold border border-0
                bg-black text-white rounded-md px-10 py-2
                hover:bg-fuchsia-600 mx-auto" onClick={createProduct}>Додати</button>
            </form>
        </div>
    </div>
}
export default ProductForm

