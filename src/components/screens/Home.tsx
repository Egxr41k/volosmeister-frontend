import BorderedBtn from "../btns/BorderedBtn";
import {navigateTo} from "../Navigation";

const Home = () => {
    return <div className="relative">
        <img src="https://static.tildacdn.com/tild3461-3062-4839-a133-623333343030/kak-vibrat-mebel-dly.jpg"
             alt="" className="w-full object-cover h-[90vh]"/>
        <div className="absolute flex -translate-x-2/4 -translate-y-2/4 bg-opacity-80 bg-fuchsia-950
                        left-1/2 top-1/2 w-full h-full justify-center items-center">
            <div className="text-center text-white">
                <p className="font-bold text-sm mb-16">РОБИМО ВСЕ ДЛЯ ВАШОГО КОМФОРТУ</p>
                <h2 className="font-semibold text-6xl my-4">The Blooming Home</h2>
                <p className="font-light white-space: pre-wrap my-6">
                    Безліч товарів, щоб полегшити Ваше життя!<br/>
                    Постійні акції та знижки!<br/>
                    Тільки якісний продукт, перевірений часом та нами особисто!
                </p>
                <BorderedBtn handleClick={() => navigateTo("/TheBloomingHome.UI/ProductList")}
                             children="Discover"
                             color="white"/>
            </div>
        </div>
    </div>
}

export default Home