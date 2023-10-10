import { createContext, ReactNode, useContext, useState } from "react"
import { CartContent } from "../components/cart/CartContent"
import { useLocalStorage } from "../hooks/useLocalStorage"

type CartProviderProps = {
    children: ReactNode
}

export interface ICartItem {
    id: number,
    quantity: number,
}

type CartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: ICartItem[]
}

const CartContext = createContext({} as CartContext)

export function CartProvider({ children }: CartProviderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<ICartItem[]>(
        "shopping-cart",
        []
    )

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        -1
    )

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <CartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartItems,
                cartQuantity,
            }}
        >
            {children}
            <CartContent isOpen={isOpen} />
        </CartContext.Provider>
    )
}

export default CartContext