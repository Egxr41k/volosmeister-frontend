import React, {useState} from "react";
import Navigation from "./Navigation";
import useCart from "../hooks/useCart";
import CartBtn from "./btns/CartBtn";

const Header = () => {
    const { openCart, cartQuantity } = useCart()

    return <header className="flex bg-fuchsia-600 px-40 h-[7vh]">
        <div className='flex justify-between relative w-full align-middle'>
            <Navigation/>

            {/*<Navigation/>*/}

            {/*<CartBtn handleClick = {openCart}>*/}
            {/*    { `${cartQuantity}` }*/}
            {/*</CartBtn>*/}
        </div>
    </header>
}

export default Header