import React, {useState} from "react";
import {NavBar} from "./NavBar";
import {CartBtn} from "./CartBtn";


export const Header = () =>{
    return <div className="bg-fuchsia-600 px-40">
        <CartBtn/>
    </div>
}


