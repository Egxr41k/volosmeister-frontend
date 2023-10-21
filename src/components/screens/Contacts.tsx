import React from "react";
import TelegramIcon from "../../icons/telegram.svg"
import ViberIcon from "../../icons/viber.svg"
import MessengerIcon from "../../icons/messenger.svg"
import InstagramIcon from "../../icons/instagram.svg"

const Contacts = () =>{
    return <div className="relative">
        <img src="/logo.png"
             alt=""
             className="object-cover h-[90vh] opacity-10 mx-auto"/>

        <div className="absolute flex -translate-x-2/4 -translate-y-2/4 bg-opacity-80
                        left-1/2 top-1/2 w-full h-full justify-center items-center">
            <div className="text-center text-black">
                <h2 className="text-2xl mb-10">
                    Якщо у вас ще залищились питання,<br/>
                    то ми з радістю відповімо на них<br/>
                    у наши соц мережах.<br/>
                    <span className="font-semibold">
                        Звертайтеся!
                    </span>
                </h2>

                <div className="flex flex-col gap-4">
                    <a href="#" className="font-semibold border-0 bg-black text-white rounded-md px-4 py-2 ease-in-out duration-300 hover:bg-fuchsia-600 focus:bg-fuchsia-700 mx-auto">
                        <div className="flex">
                            <img src={TelegramIcon} className="" alt=""/>
                            <p className="text-white mx-1 my-auto">Telegram</p>
                        </div>
                    </a>

                    <a href="#" className="font-semibold border-0 bg-black text-white rounded-md px-4 py-2 ease-in-out duration-300 hover:bg-fuchsia-600 focus:bg-fuchsia-700  mx-auto">
                        <div className="flex">
                            <img src={ViberIcon} className="" alt=""/>
                            <p className="text-white mx-1 my-auto">Viber</p>
                        </div>
                    </a>

                    <a href="#" className="font-semibold border-0 bg-black text-white rounded-md px-4 py-2 ease-in-out duration-300 hover:bg-fuchsia-600 focus:bg-fuchsia-700 mx-auto">
                        <div className="flex">
                            <img src={InstagramIcon} className="" alt=""/>
                            <p className="text-white mx-1 my-auto">Instagram</p>
                        </div>
                    </a>

                    <a href="#" className="font-semibold border-0 bg-black text-white rounded-md px-4 py-2 ease-in-out duration-300 hover:bg-fuchsia-600 focus:bg-fuchsia-700 mx-auto">
                        <div className="flex">
                            <img src={MessengerIcon} className="" alt=""/>
                            <p className="text-white mx-1 my-auto">Messenger</p>
                        </div>
                    </a>
                </div>

            </div>
        </div>
    </div>
}

export default Contacts