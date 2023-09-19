import React from "react";
import {IProduct} from "../types/IProduct";
import {FilledBtn, BorderedBtn} from "./Btns";
import {RequestHandler} from "../services/RequestHandler";

const ProductItem = ({item}:{item: IProduct}) => {
    const isAdmin = true
    return <div key={item.id} className="w-80 h-160 bg-fuchsia-50 mx-10 my-5">
        <img src={item.imageSrc != "" ? item.imageSrc :
            "https://localhost:7128/GetImage/0"}
             alt={item.name}
             className="w-full h-96 object-cover"/>
        <div className="p-6 h-64">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="font-extralight h-20 my-2">{item.description} </p>
            <p className="text-fuchsia-600 my-3">
                {item.newPrice} грн.
                <span className="line-through text-gray-500 mr-14">
                    {item.oldPrice} грн.
                </span>
                {item.isAvailable ?
                    <span className="text-fuchsia-600">в наявності</span> :
                    <span className="text-gray-500">немає в наявності </span>
                }
            </p>
            <div className="flex justify-between align-bottom">
                <FilledBtn handleClick={isAdmin ?
                    async () => await RequestHandler().delete(item.id) :
                    async ()=> console.log()}>
                    {isAdmin ? "Видалити" : "В кошик"}
                </FilledBtn>
                <BorderedBtn handleClick={async () => console.log()}>
                    {isAdmin ? "Редагувати" : "Детальніше"}
                </BorderedBtn>
            </div>
        </div>
    </div>;
}
export default ProductItem