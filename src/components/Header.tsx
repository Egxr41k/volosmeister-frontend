import React, {useState} from "react";
import {NavBar} from "./NavBar";
import {CartBtn} from "./CartBtn";


export const Header = () =>{
    return <div className="bg-fuchsia-600 flex justify-between items-center relative w-full  px-40">
        <NavBar/>
        <CartBtn/>
    </div>
}


