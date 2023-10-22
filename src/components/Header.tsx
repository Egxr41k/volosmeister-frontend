import React, {useState} from "react";
import Navigation from "./Navigation";
import MenuIcon from "../icons/menu.svg"
import CartIcon from "../icons/cart.svg"
import Drawer from "./Drawer";
import Cart from "./Cart";

const Header = () => {
    return <header className="flex justify-between bg-fuchsia-600 py-auto px-12 md:px-40 h-[7vh] w-full">

        <div className="hidden md:block">
            <Navigation/>
        </div>

        <div className="flex md:hidden">
            <Drawer position="left" btnIconSrc={MenuIcon}>
                <div className="w-min mx-auto">
                    <Navigation/>
                </div>
            </Drawer>
        </div>

        <div className="flex">
            <Drawer position="right" btnIconSrc={CartIcon}>
                <Cart/>
            </Drawer>
        </div>

    </header>
}

export default Header