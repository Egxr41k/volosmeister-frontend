import React from "react";
import {INavLinkProps} from "../types/IProps";
import Home from "./screens/Home";
import ProductList from "./screens/ProductList";
import About from "./screens/About";
import Questions from "./screens/Questions";
import Contacts from "./screens/Contacts";
import ProductDetails from "./screens/ProductDetails";
import BorderedBtn from "./btns/BorderedBtn";
import Admin from "./screens/Admin";
import {getIdFromUrl} from "../services/StringService";

const path = window.location.pathname

export const CurrentScreen = () =>{
    switch (path) {
        case "/Home":        return <Home/>
        case "/ProductList": return <ProductList/>
        case "/About":       return <About/>
        case "/Questions":   return <Questions/>
        case "/Contacts":    return <Contacts/>
        case "/Admin":       return <Admin/>
        default: return DetailsRoute()
    }
}

const DetailsRoute = () => {
    if (path.includes("/ProductDetails/")) {
        return <ProductDetails id={getIdFromUrl(path)}/>
    } else {
        return <div className="flex justify-center items-center">
            <p>ви, мабуть, заблукали...</p>
            <BorderedBtn handleClick={() => window.location.pathname = "/Home"}>
                вертайтеся на головну
            </BorderedBtn>
        </div>
    }
}

const Navigation = () => {
    return <nav className="flex">
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
export default Navigation

