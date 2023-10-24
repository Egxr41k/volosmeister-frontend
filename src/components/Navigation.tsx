import React, {useEffect} from "react";
import {INavLinkProps} from "../types/IProps";
import useAdmin from "../hooks/useAdmin";
import {Link, NavLink, Route, Routes} from "react-router-dom";
import Home from "./screens/Home";
import ProductList from "./screens/ProductList";
import AboutUs from "./screens/AboutUs";
import Questions from "./screens/Questions";
import Contacts from "./screens/Contacts";
import Admin from "./screens/Admin";
import ProductDetails from "./screens/ProductDetails";
import ProductForm from "./screens/ProductForm";
import {getIdFromUrl} from "../services/StringService";

const path = window.location.pathname

export const CurrentScreen = () =>{

    return <Routes>
        <Route path="/"                       element={<Home/>}/>
        <Route path="/Home"                   element={<Home/>}/>
        <Route path="/ProductList"            element={<ProductList/>}/>
        <Route path="/AboutUs"                element={<AboutUs/>}/>
        <Route path="/Questions"              element={<Questions/>}/>
        <Route path="/Contacts"               element={<Contacts/>}/>
        <Route path="/Admin"                  element={<Admin/>}/>
        <Route path="/ProductDetails/:id"      element={<ProductDetails/>}/>
        <Route path="/ProductForm/:id"        element={<ProductForm/>} />
    </Routes>
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
    const setActive = (isActive: boolean) => {
        return ["text-white", isActive && "font-bold"].join(" ")
    }

    return <li className="m-3">
        <NavLink to={href}  className={({isActive}) => setActive(isActive)}>
            {children}
        </NavLink>
    </li>
}
export default Navigation

