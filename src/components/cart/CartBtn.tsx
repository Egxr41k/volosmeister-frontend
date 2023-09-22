import React from "react";
import {IBtnProps} from "../../types/IProps";

export const CartBtn = ({handleClick, children}: IBtnProps) => {
    return <button className='bg-transparent border-none relative'
                   onClick={handleClick}>
        <img src="/cart.png" alt='' />

        <div className='text-fuchsia-600 absolute bottom-0 right-1 font-bold rounded-full bg-white w-5 h-5 flex items-center text-center'>
            {children}
        </div>
    </button>
}