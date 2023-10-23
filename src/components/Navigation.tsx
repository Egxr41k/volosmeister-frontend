import React, {useEffect} from "react";
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
        case "/TheBloomingHome.UI/":                   return <Home/>
        case "/TheBloomingHome.UI/Home":                   return <Home/>
        case "/TheBloomingHome.UI/ProductList":            return <ProductList/>
        case "/TheBloomingHome.UI/AboutUs":                return <AboutUs/>
        case "/TheBloomingHome.UI/Questions":              return <Questions/>
        case "/TheBloomingHome.UI/Contacts":               return <Contacts/>
        case "/TheBloomingHome.UI/Admin":                  return <Admin/>
        case `/TheBloomingHome.UI/ProductDetails/${id}`:   return <ProductDetails id={id!}/>
        case `/TheBloomingHome.UI/ProductForm/${id}`:      return <ProductForm id={id!}/>

        default: return <div className="flex justify-center items-center">
            <p>ви, мабуть, заблукали...</p>
            <BorderedBtn handleClick={() => navigateTo("/TheBloomingHome.UI/Home")}>
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
        <CustomLink href="/TheBloomingHome.UI/Home">        Головна</CustomLink>
        <CustomLink href="/TheBloomingHome.UI/ProductList"> Каталог</CustomLink>
        {isAdmin &&
        <CustomLink href="/TheBloomingHome.UI/ProductForm/0"> Додати товар </CustomLink>
        }
        <CustomLink href="/TheBloomingHome.UI/AboutUs">     Про нас</CustomLink>
        <CustomLink href="/TheBloomingHome.UI/Questions">   Питання</CustomLink>
        <CustomLink href="/TheBloomingHome.UI/Contacts">    Контакти</CustomLink>
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

