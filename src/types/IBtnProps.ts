import React from "react";

export interface IBtnProps {
    handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    content: string
}