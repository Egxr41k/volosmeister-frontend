import React from "react";
import {IBtnProps} from "../types/IProps";

export const FilledBtn = ({handleClick, children}: IBtnProps) =>{
    return <button className={[
            "font-semibold border-0 bg-black text-white rounded-md px-4 py-2",
            children === "Видалити"?
                "hover:bg-fuchsia-600" :
                "hover:bg-red-600"
        ].join(" ")} onClick={handleClick}>
        {children}
    </button>
}

export const BorderedBtn = ({handleClick, children}: IBtnProps, color?: string) =>{
    return <button className={
        ["border rounded-md px-4 py-2 hover:border-fuchsia-600 hover:text-fuchsia-600",
            color === "black" ?
                "border-black text-black" :
                "border-white text-white"
        ].join(" ")}
                   onClick={handleClick}>
        {children}
    </button>
}