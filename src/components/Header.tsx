import React, {useState} from "react";
import {Navigation} from "./Navigation";
import {CartBtn} from "./cart/CartBtn";
import {CartItem} from "./cart/CartItem";
import {IProduct} from "../types/IProduct";
import {useShoppingCart} from "../context/ShoppingCartContext";

export const Header = () => {
    const { openCart, cartQuantity } = useShoppingCart()

    //const [isShowCart, setIsShowCart] = useState(false)
    //const total = cartItems.reduce((acc, item) => acc + item.newPrice, 0)

    return <div className="flex bg-fuchsia-600 px-40 h-[7vh]">
        <div className='flex justify-between relative w-full align-middle'>
            <Navigation/>
        <button onClick={openCart} className="h-10 w-20">

        </button>
            <CartBtn handleClick = {openCart}>
                { `${cartQuantity}` }
            </CartBtn>
        </div>
    </div>
}