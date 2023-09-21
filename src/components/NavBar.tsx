import React from "react";
import {INavLinkProps} from "../types/IProps";
import {Home} from "./screens/Home";
import {ProductList} from "./screens/ProductList";
import {About} from "./screens/About";
import {Questions} from "./screens/Questions";
import {Contacts} from "./screens/Contacts";
import {ProductDetails} from "./ProductDetails";

const path = window.location.pathname
export const CurrentScreen = () =>{
    switch (path) {
        case "/Home":        return <Home/>
        case "/ProductList": return <ProductList/>
        //case "/ProductDetails": return <ProductDetails/>
        case "/About":       return <About/>
        case "/Questions":   return <Questions/>
        case "/Contacts":    return <Contacts/>
    }
}
export const NavBar = () => {
    return<nav className="flex">
        <ul className="flex my-auto">
            <CustomLink href="/Home">        Головна</CustomLink>
            <CustomLink href="/ProductList"> Каталог</CustomLink>
            <CustomLink href="/About">       Про нас</CustomLink>
            <CustomLink href="/Questions">   Питання</CustomLink>
            <CustomLink href="/Contacts">    Контакти</CustomLink>
        </ul>
    </nav>
}

const CustomLink = ({href, children} : INavLinkProps) => {
    return <li className="mx-4">
        <a href={href} className={[
                "text-white", //default  styles
                path === href ?
                    "font-bold" //styles when active
                    : ""
        ].join(" ")}>
            {children}
        </a>
    </li>
}

