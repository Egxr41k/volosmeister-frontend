import {BorderedBtn} from "../Btns";

export const Home = () => {
    return <div className="relative">
        <img src="https://static.tildacdn.com/tild3461-3062-4839-a133-623333343030/kak-vibrat-mebel-dly.jpg"
             alt="" className="w-full h-full"/>
        <div className="absolute flex -translate-x-2/4 -translate-y-2/4 bg-opacity-80 bg-fuchsia-950
                        left-1/2 top-1/2 w-full h-full justify-center items-center">
            <div className="text-center text-white">
                <p>РОБИМО ВСЕ ДЛЯ ВАШОГО КОМФОРТУ</p>
                <h2 className="">The Blooming Home</h2>
                <p className="">Безліч товарів, щоб полегшити Ваше життя!
                    Постійні акції та знижки!
                    Тільки якісний продукт, перевірений часом та нами особисто!</p>
                <BorderedBtn handleClick={() => window.location.pathname = "/ProductList"}
                             children="Discover"
                             color="white"/>
            </div>
        </div>
    </div>
}