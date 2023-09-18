import React, {ReactNode} from "react";

export interface IBtnProps {
    handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    content: string
}

export interface INavLinkProps{
    href: string;
    children: ReactNode;
}