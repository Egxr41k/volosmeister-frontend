import {useState} from "react";
import {IProduct} from "../types/IProduct";
import {useDispatch} from "react-redux";
//import cartIcon from "../../public/cart.svg"

const cartItems: IProduct[] = [
    {
        "id": 6,
        "name": "ПАЛИЧКИ SANI STIKS!",
        "imageSrc": "https://static.tildacdn.com/tild3137-6635-4664-b362-363464666638/IMG_20230702_004919_.jpg",
        "description": "ДЛЯ ЧИЩЕННЯ ЗАСМІЧЕНЬ ЗЛИВУ РАКОВИНИ ТА КАНАЛІЗАЦІЇ!",
        "count": 10,
        "isAvailable": true,
        "newPrice": 199,
        "oldPrice": 329,
        "isSale": false
    }
]
export const CartBtn = () => {
    const [isShowCart, setIsShowCart] = useState(false)

    //const cart = useTypedSelector(state => state.cart)
    const total = cartItems.reduce((acc, item) => acc + item.newPrice, 0)

    //const dispatch = useDispatch()

    const removeHandler = (id: number) => {
        //dispatch(removeFromCart(id))
    }

    return <button className='bg-transparent border-none relative'
                onClick={() => setIsShowCart(!isShowCart)}>
            <img src="/cart.png" alt='' width='50' />

            <div className='text-fuchsia-600 absolute bottom-0 right-1 font-bold rounded-full bg-white w-5 h-5 flex items-center text-center'>
                {cartItems.length}
            </div>
        </button>
}

export const CartContent = (isHidden: boolean) => {
    //const dispatch = useDispatch()
    const total = cartItems.reduce((acc, item) => acc + item.newPrice, 0)
    const removeHandler = (id: number) => {
        //dispatch(removeFromCart(id))
    }
    return  <div className={['bg-white absolute right-0 shadow-md p-5 rounded-md z-10 top-14',
        isHidden ? "hidden" : ""].join(" ")}>
        {cartItems.map(item => (
            <div className='flex items-center mb-4'
                 key={`cart item ${item.name}`}>
                <img src={item.imageSrc}
                     alt={item.name}
                     width='55'
                     height='55'
                     className='mr-3' />
                <div>
                    <div>
                        {item.name}
                    </div>
                    <div>
                        {`${item.count} x $${item.newPrice.toLocaleString()}`}
                    </div>
                    <button className='text-red-600 bg-transparent border-0'
                            onClick={() => removeHandler(item.id)}>
                        Удалить
                    </button>
                </div>
            </div>
        ))}

        <div className='text-lg border-solid border-t-2 border-red-100 pt-1 mt-5'>
            Total: <b>
            ${total.toLocaleString()}
        </b>
        </div>
    </div>
}

