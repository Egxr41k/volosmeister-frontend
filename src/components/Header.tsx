import React, {useState} from "react";
import {Navigation} from "./Navigation";
import {CartBtn} from "./cart/CartBtn";
import {CartItem} from "./cart/CartItem";
import {IProduct} from "../types/IProduct";
import {useCart} from "../context/CartContext";

export const Header = () => {
    const { openCart, cartQuantity } = useCart()

    return <div className="flex bg-fuchsia-600 px-40 h-[7vh]">
        <div className='flex justify-between relative w-full align-middle'>
            <Navigation/>

            <CartBtn handleClick = {openCart}>
                { `${cartQuantity}` }
            </CartBtn>
        </div>
    </div>
}