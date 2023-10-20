import React, {useState} from "react";
import Navigation from "./Navigation";
import useCart from "../hooks/useCart";
import CartBtn from "./btns/CartBtn";

const Header = () => {
    //const { openCart, cartQuantity } = useCart()
    const [isOpenNavbar, setIsOpenNavbar] = useState(false)
    const [isOpenCart, setIsOpenCart] = useState(false)

    return <header className="flex bg-fuchsia-600 px-40 h-[7vh]">
        <div className='container m-auto'>
            <div className="grid grid-cols-2 items-center">



                <div className="flex md:hidden justify-start z-10">
                    <div className="relative">
                        <button onClick={() => setIsOpenNavbar(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    <nav className={[
                        "fixed h-screen top-0 left-0 w-60 shadow-md flex items-center justify-center duration-300 bg-fuchsia-600 transform" ,
                        isOpenNavbar ?
                            "-translate-x-0"
                            :"-translate-x-full"
                    ].join(" ")}>
                        <button className="absolute top-6 right-6" onClick={() => setIsOpenNavbar(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="w-min mx-auto">
                            <Navigation/>
                        </div>
                    </nav>
                </div>


                <div className="flex justify-end z-10">
                    <div className="relative">
                        <button onClick={() => setIsOpenCart(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </button>
                    </div>
                    <nav className={[
                        "fixed h-screen top-0 right-0 w-80 shadow-md flex items-center justify-center duration-300 bg-fuchsia-600 transform",
                        isOpenCart ?
                            "translate-x-0"
                            : "translate-x-full"
                    ].join(" ")}>
                        <button className="absolute top-6 left-6" onClick={() => setIsOpenCart(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div>
                            Cart
                        </div>
                    </nav>
                </div>

            </div>
        </div>
    </header>
}

export default Header