import React from "react";
import {INavLinkProps} from "../types/IProps";
import Home from "./screens/Home";
import ProductList from "./screens/ProductList";
import AboutUs from "./screens/AboutUs";
import Questions from "./screens/Questions";
import Contacts from "./screens/Contacts";
import ProductDetails from "./screens/ProductDetails";
import BorderedBtn from "./btns/BorderedBtn";
import Admin from "./screens/Admin";
import {getIdFromUrl} from "../services/StringService";
import ProductForm from "./screens/ProductForm";
import useAdmin from "../hooks/useAdmin";

const path = window.location.pathname

export const CurrentScreen = () =>{
    let id = getIdFromUrl(path)
    switch (path) {
        case "/Home":                   return <Home/>
        case "/ProductList":            return <ProductList/>
        case "/AboutUs":                return <AboutUs/>
        case "/Questions":              return <Questions/>
        case "/Contacts":               return <Contacts/>
        case "/Admin":                  return <Admin/>
        case `/ProductDetails/${id}`:   return <ProductDetails id={id!}/>
        case `/ProductForm/${id}`:      return <ProductForm id={id}/>

        default: return <div className="flex justify-center items-center">
            <p>ви, мабуть, заблукали...</p>
            <BorderedBtn handleClick={() => window.location.pathname = "/Home"}>
                вертайтеся на головну
            </BorderedBtn>
        </div>
    }
}

export const navigateTo = (pathname: string) => {
    window.location.pathname = pathname
}

const Navigation = () => {
    const { isAdmin} = useAdmin()
    return <ul className="flex flex-wrap">
        <CustomLink href="/Home">        Головна</CustomLink>
        <CustomLink href="/ProductList"> Каталог</CustomLink>
        {isAdmin &&
        <CustomLink href="/ProductForm/0"> Додати товар </CustomLink>
        }
        <CustomLink href="/AboutUs">     Про нас</CustomLink>
        <CustomLink href="/Questions">   Питання</CustomLink>
        <CustomLink href="/Contacts">    Контакти</CustomLink>
    </ul>
}

const CustomLink = ({href, children} : INavLinkProps) => {
    return <li className="m-3">
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

