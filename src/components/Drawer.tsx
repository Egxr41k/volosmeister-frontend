import React, {useState} from "react";
import CloseIcon from "../icons/close.svg";

interface IDrawerProps {
    position : "left" | "right",
    children: React.ReactNode,
    btnIconSrc: string
}

const Drawer = ({position, children, btnIconSrc}: IDrawerProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const drawerPos = {
        "right" : "fixed top-0 right-0",
        "left"  : "fixed top-0 left-0"
    }
    const closeBtnPos = {
        "right" : "absolute top-6 left-6",
        "left"  : "absolute top-6 right-6"
    }

    const hider = {
        "right" : isOpen ? " translate-x-0" : " translate-x-full",
        "left"  : isOpen ? "-translate-x-0" : "-translate-x-full"
    }

    return <div className="flex z-10">
        <button className="w-8 h-8 my-auto" onClick={() => setIsOpen(true)}>
            <img src={btnIconSrc} alt=""/>
        </button>
        <div className={[ drawerPos[position], hider[position],
            "flex items-center justify-center h-screen w-60 shadow-md duration-300 bg-fuchsia-600 z-10",
        ].join(" ")}>
            <button className={closeBtnPos[position]} onClick={() => setIsOpen(false)}>
                <img src={CloseIcon} className="w-8 h-8" alt=""/>
            </button>
            {children}
        </div>
    </div>
}

export default Drawer
