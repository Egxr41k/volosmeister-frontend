import React from "react";
import {IBtnProps} from "../../types/IProps";
interface IBorderedBtnProps extends IBtnProps{
    color?: string
}

const BorderedBtn = ({handleClick, children, color = "black"}: IBorderedBtnProps) =>{
    return <button className={[
        "border rounded-md px-4 py-2 ease-in-out duration-300",
        "min-h-[45px] min-w-[45px]",
        "hover:border-fuchsia-600 hover:text-fuchsia-700",
        "focus:border-fuchsia-600 focus:text-fuchsia-700",
            color === "black" ?
                "border-black text-black" :
                "border-white text-white"
        ].join(" ")}
                   onClick={handleClick}>
        {children}
    </button>
}

export default BorderedBtn