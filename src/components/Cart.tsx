import React from "react";
import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import IProduct from "../types/IProduct";
import BorderedBtn from "./btns/BorderedBtn";
import FilledBtn from "./btns/FilledBtn";
//import CartItem from "./CartItem";

const Cart = () => {
    const {cartItems} = useCart()
    const products = useProducts()

    const showItems = () => {
        console.log(cartItems)
        return cartItems.map(item => {
            const product = findProductById(item.id)
            return product && <div>
                <CartItem product={product!} quantity={item.quantity}/>
                <CartItem product={product!} quantity={item.quantity}/>
            </div>
        })
    }

    const calculateTotalPrice = (): number => {
        return cartItems.reduce((total, item) => {
            const product = findProductById(item.id)
            return total + (product?.newPrice || 0) * item.quantity
        }, 0)
    }

    const findProductById = (id: number) => {
        return products.find(i => i.id === id)
    }

    return <div className="bg-fuchsia-50 w-48 text-center">
        {cartItems.length == 0 ?
            <p className="p-3">
                Ваш кошик поки що порожній
            </p> :
            <div className="h-96">
                <div className="overflow-y-auto h-72">
                    {showItems()}
                </div>
                <p className="text-lg font-semibold mb-2">
                    Загалом: {calculateTotalPrice()} грн.
                </p>
                <FilledBtn handleClick={()=>{}}>
                    Замовити все
                </FilledBtn>
            </div>
        }
    </div>
}

const CartItem = ( {product, quantity} : {product: IProduct, quantity: number}) => {
    const {increaseCartQuantity, decreaseCartQuantity } = useCart()

    return <div className="flex flex-col gap-3 border-solid p-3">
        <img src={product.imageSrc} alt="" className="w-32 h-32 mx-auto"/>
        <p>
            {product.name}
        </p>
        <div className="flex justify-around items-center">
            <BorderedBtn handleClick={() => increaseCartQuantity(product.id)}>
                +
            </BorderedBtn>
            <p>
                {quantity}
            </p>
            <BorderedBtn handleClick={() => decreaseCartQuantity(product.id)}>
                -
            </BorderedBtn>
        </div>
        <p className="text-start">
            Ціна: {product.newPrice.toLocaleString()} грн.
        </p>
    </div>
}

export default Cart