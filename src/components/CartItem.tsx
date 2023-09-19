import {IProduct} from "../types/IProduct";
import React from "react";

export const CartItem = ({item}:{item: IProduct}) => {

    //const dispatch = useDispatch()
    const removeHandler = (id: number) => {
        //dispatch(removeFromCart(id))
    }
    return <div className='flex items-center mb-4'
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
}