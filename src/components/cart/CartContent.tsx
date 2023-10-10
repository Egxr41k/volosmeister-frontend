import {CartItem} from "./CartItem";
import React from "react";
import {storeItems} from "../../App";
import useCart from "../../hooks/useCart";

type ShoppingCartProps = {
    isOpen: boolean
}

export function CartContent({isOpen} : ShoppingCartProps) {
    const {closeCart, cartItems} = useCart()
    return <div className = {
        ['bg-white absolute right-0 shadow-md p-5 rounded-md z-10 top-14 mr-40',
            !isOpen && "hidden"
        ].join(" ")}>
        {cartItems.map(item => <CartItem key={item.id} {...item}/>)}

        <div className='text-lg border-solid border-t-2 border-red-100 pt-1 mt-5'>
            Total: <b>
            {cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i.id === cartItem.id)
                return total + (item?.newPrice || 0) * cartItem.quantity
            }, 0)
                .toLocaleString()}
        </b>
        </div>
    </div>
}