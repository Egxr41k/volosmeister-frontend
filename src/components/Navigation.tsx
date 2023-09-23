import React, {useContext} from "react";
import {INavLinkProps} from "../types/IProps";
import {Home} from "./screens/Home";
import {ProductList} from "./screens/ProductList";
import {About} from "./screens/About";
import {Questions} from "./screens/Questions";
import {Contacts} from "./screens/Contacts";
import {ProductDetails} from "./screens/ProductDetails";
import {AdminContext} from "../context/AdminContext";

const path = window.location.pathname
export const CurrentScreen = () =>{
    switch (path) {
        case "/Home":        return <Home/>
        case "/ProductList": return <ProductList/>
        case "/About":       return <About/>
        case "/Questions":   return <Questions/>
        case "/Contacts":    return <Contacts/>
        case "/admin":       return AdminRoute()
        default: return DetailsRoute()
    }
}
const DetailsRoute = () => {
    if(path.includes("/ProductDetails/")){
        path.charAt(path.length - 1)
        let result = path.replace("/ProductDetails/", "")
        let id = parseInt(result)
        return <ProductDetails id={id}/>
    } else return <>вы, наверное, заблудились...</>
}

const AdminRoute = () => {
    const { isAdmin, setAdmin } = useContext(AdminContext);
    const handleClick = () => {
        setAdmin()
        console.log(isAdmin)
    };

    return (
        <div>
            <button onClick={setAdmin}>
                {isAdmin ? 'Disable admin mode' : 'Enable admin mode'}
            </button>
        </div>
    );
}
export const Navigation = () => {
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

