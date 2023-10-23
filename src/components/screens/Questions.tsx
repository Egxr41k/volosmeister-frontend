import React, {useState} from "react";
import ArrowUp from "../../icons/arrow_up.svg";
import ArrowDown from "../../icons/arrow_down.svg";
import logo from "../../imgs/logo.png"


const Questions = () => {
    return <div className="relative">
        <img src={logo}
             alt=""
             className="object-cover h-[90vh] opacity-10 mx-auto"/>

        <div className="absolute flex -translate-x-2/4 -translate-y-2/4 bg-opacity-80
                        left-1/2 top-1/2 w-full h-full px-12 md:px-40">

            <div className="">
                <h2 className="text-2xl my-5 font-semibold">
                    Найпоширеніші питанння:
                </h2>

                <QuestionSection title={"1. Замовлення"}>

                    <div className="flex my-2.5">
                        <p className="rounded-full w-7 h-7 text-center text-white font-semibold bg-fuchsia-500">
                            1
                        </p>
                        <p className="my-auto mx-2">
                            Залиште свої дані
                        </p>
                    </div>

                    <div className="flex my-2.5">
                        <p className="rounded-full w-7 h-7 text-center text-white font-semibold bg-fuchsia-500">
                            2
                        </p>
                        <p className="my-auto mx-2">
                            Замовте потрібний колір
                        </p>
                    </div>

                    <div className="flex my-2.5">
                        <p className="rounded-full w-7 h-7 text-center text-white font-semibold bg-fuchsia-500">
                            3
                        </p>
                        <p className="my-auto mx-2">
                            Оберіть зручний спосіб доставки
                        </p>
                    </div>

                    <div className="flex my-2.5">
                        <p className="rounded-full w-7 h-7 text-center text-white font-semibold bg-fuchsia-500">
                            4
                        </p>
                        <p className="my-auto mx-2">
                            отримайте на пошті, оглядайте і оплчуєте
                        </p>
                    </div>

                </QuestionSection>

                <QuestionSection title={"2. Доставка"}>
                    <p className="whitespace-pre-line">
                        Відправка Новою Поштою 1-3 дні. Оплата при отриманні.<br/>
                        Відправка Укрпоштою 4-7 днів. Оплата при отриманні.<br/>
                        Вартість доставки згідно тарифів обраної пошти.<br/>
                    </p>
                </QuestionSection>

            </div>
        </div>
    </div>
}

const QuestionSection = ({title, children}: {title: string, children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false)

    return <div className="my-5">
        <div className="inline-flex">
            <h3 className="text-1xl font-semibold">
                {title}
            </h3>
            <button onClick={() => setIsOpen(!isOpen)}>
                 <img src={isOpen ? ArrowDown : ArrowUp} alt="" className="w-6 h-6"/>
            </button>
        </div>

        <div className={["ml-5 gap-2",
            isOpen ? "block" : "hidden"].join(" ")}>
            {children}
        </div>
    </div>
}
 export default Questions