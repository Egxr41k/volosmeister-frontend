import React from "react";
import {INavLinkProps} from "../types/IProps";

export const NavBar = () => {
    const path = window.location.pathname
    return <nav className='bg-fuchsia-600'>
        <div>
            <ul>
                <CustomLink href="/Home">Головна</CustomLink>
                <CustomLink href="/ProductList">Каталог</CustomLink>
                <CustomLink href="/About">Про нас</CustomLink>
                <CustomLink href="/Questions">Питання</CustomLink>
                <CustomLink href="/Contacts">Контакти</CustomLink>
            </ul>
        </div>
    </nav>
}

const CustomLink = ({href, children} : INavLinkProps) => {
    const path = window.location.pathname
    return <li>
        <a href={href} className={[
                "text-white", //default link styles
                path === href ?
                    "font-bold" //styles when active
                    : ""
        ].join(" ")}>
            {children}
        </a>
    </li>
}

