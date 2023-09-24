import React, {useContext} from "react";
import {INavLinkProps} from "../types/IProps";
import {Home} from "./screens/Home";
import {ProductList} from "./screens/ProductList";
import {About} from "./screens/About";
import {Questions} from "./screens/Questions";
import {Contacts} from "./screens/Contacts";
import {ProductDetails} from "./screens/ProductDetails";
import {useAdminContext} from "../context/AdminContext";
import {BorderedBtn} from "./Btns";

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
    if(path.includes("/ProductDetails/")){
        path.charAt(path.length - 1)
        let result = path.replace("/ProductDetails/", "")
        let id = parseInt(result)
        return <ProductDetails id={id}/>
    } else return <>вы, наверное, заблудились...</>
}

const Admin = () => {
    const { isAdmin, setAdmin } = useAdminContext()

    return <div className="flex justify-center items-center h-[90vh]">
        <div className="text-center ">
            <BorderedBtn handleClick={setAdmin}>
                Enable admin mode
            </BorderedBtn>
            {isAdmin && <div className="flex mt-5">
                <p className="mr-1.5">ви тепер адміністратор, це означає що ви можете</p>
                <a href="/ProductList" className="text-fuchsia-500 underline">редагувати</a>
                <p className="ml-1.5">цей сайт</p>
            </div>}
        </div>
    </div>

}

export const Navigation = () => {
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

