import React, {ReactNode} from "react";

export interface IBtnProps {
    handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children: string
}

export interface INavLinkProps{
    href: string;
    children: string;
}