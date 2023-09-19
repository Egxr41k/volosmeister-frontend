import React, {useState} from "react";
import {NavBar} from "./NavBar";
import cartIcon from "../../public/cart.svg"

export const Header = () =>{
    return <div className="bg-fuchsia-600 flex justify-between px-40">
        <NavBar/>
        <img src="/cart.png" alt="додайте товар" height="36" width="36" className="my-auto"/>
    </div>
}


