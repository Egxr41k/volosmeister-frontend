import React, {useEffect, useState} from "react";
import IProduct from "../types/IProduct";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import FilledBtn from "./btns/FilledBtn";
import BorderedBtn from "./btns/BorderedBtn";
import useProductInfo from "../hooks/useProductInfo";
import {checkImageExisting} from "../services/ HttpClient/ImageRequests";
import {textFormatter} from "../services/StringService";
import {Link} from "react-router-dom";
import NO_PHOTO_YET from "../imgs/NO_PHOTO_YET.png"

const ProductItem = ({item}:{item: IProduct}) => {
    const {increaseCartQuantity} = useCart()
    const { isAdmin} = useAdmin()

    const {request} = useProductInfo()

    const [isImageExist, setIsImageExist] = useState(false)

    useEffect(() => {
        console.log("ProductItem component mount")
        checkImageExisting(item.imageSrc)
            .then(result => setIsImageExist(result))
    }, []);

    return <div key={item.id} className="w-80 h-160 bg-fuchsia-50 mx-10 my-5">
        <img src={isImageExist ? item.imageSrc : NO_PHOTO_YET}
             alt=""
             className="w-full h-96 object-cover"/>
        <div className="p-5 h-64">
            <h2 className="text-xl font-semibold">{textFormatter(item.name, 30)}</h2>
            <p className="font-extralight h-24 my-2">{textFormatter(item.description, 120)} </p>
            <div className="flex justify-between my-2">
                <div className="flex gap-1">
                    <p className="text-fuchsia-600 w-fit">
                        {item.newPrice} грн.
                    </p>
                    <p className="line-through text-gray-500 w-fit">
                        {item.oldPrice} грн.
                    </p>
                </div>
                {item.isAvailable ?
                    <p className="text-fuchsia-600 w-fit">в наявності</p> :
                    <p className="text-gray-500 w-fit">немає в наявності </p>
                }
            </div>
            <div className="flex justify-between align-bottom">
                <FilledBtn handleClick={isAdmin ?
                    async () => {
                    const isSuccesses = window.confirm("вибраний вами товар буде виделанний")
                        if (isSuccesses) await request.deleteProductInfo(item.id)
                } :
                    () => increaseCartQuantity(item.id)}>
                    {isAdmin ? "Видалити" : "В кошик"}
                </FilledBtn>

                <BorderedBtn handleClick={() => {} }>
                    <Link to={`/ProductDetails/${item.id}`}>Детальніше</Link>
                </BorderedBtn>
            </div>
        </div>
    </div>;
}
export default ProductItem