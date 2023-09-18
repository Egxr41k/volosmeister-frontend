import React from "react";
import {IBtnProps} from "../types/IProps";

export const FilledBtn = ({handleClick, content}: IBtnProps) =>{
    return <button className="font-semibold border-0
                        bg-black text-white rounded-md px-4 py-2
                        hover:bg-fuchsia-600"
                   onClick={handleClick}>
        {content}
    </button>
}

export const BorderedBtn = ({handleClick, content}: IBtnProps) =>{
    return <button className="border border-black
                        text-black rounded-md px-4 py-2
                        hover:border-fuchsia-600 hover:text-fuchsia-600"
                   onClick={handleClick}>
        {content}
    </button>
}