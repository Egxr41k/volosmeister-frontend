import React, {useState} from "react";
import {NavBar} from "./NavBar";
import {CartBtn} from "./CartBtn";
import {CartItem} from "./CartItem";
import {IProduct} from "../types/IProduct";

const cartItems: IProduct[] = [
    {
        "id": 6,
        "name": "ПАЛИЧКИ SANI STIKS!",
        "imageSrc": "https://static.tildacdn.com/tild3137-6635-4664-b362-363464666638/IMG_20230702_004919_.jpg",
        "description": "ДЛЯ ЧИЩЕННЯ ЗАСМІЧЕНЬ ЗЛИВУ РАКОВИНИ ТА КАНАЛІЗАЦІЇ!",
        "count": 10,
        "isAvailable": true,
        "newPrice": 199,
        "oldPrice": 329,
        "isSale": false
    }
]

export const Header = () => {
    const [isShowCart, setIsShowCart] = useState(false)
    const total = cartItems.reduce((acc, item) => acc + item.newPrice, 0)

    return <div className="bg-fuchsia-600 px-40">
        <div className='flex justify-between relative w-full'>
            <NavBar/>

            <CartBtn handleClick = { () => setIsShowCart(!isShowCart) }>
                { cartItems.length.toString() }
            </CartBtn>

            <div className = {
                ['bg-white absolute right-0 shadow-md p-5 rounded-md z-10 top-14',
                    !isShowCart && "hidden"
                ].join(" ")}>

                {cartItems.map(item => <CartItem item={item}/>)}

                <div className='text-lg border-solid border-t-2 border-red-100 pt-1 mt-5'>
                    Total: <b>
                    ${total.toLocaleString()}
                </b>
                </div>
            </div>
        </div>
    </div>
}