import {IBtnProps} from "../../types/IProps";
import React from "react";

const FilledBtn = ({handleClick, children}: IBtnProps) =>{
    return <button className={[
        "font-semibold border-0 bg-black text-white rounded-md px-4 py-2 ease-in-out duration-300",
        children === "Видалити" || children === "Очистити кошик" ?
            "hover:bg-red-600     focus:bg-red-700":
            "hover:bg-fuchsia-600 focus:bg-fuchsia-700"
    ].join(" ")} onClick={handleClick}>
        {children}
    </button>
}
export default FilledBtn