import { ReactNode, createContext, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (bookId: number) => void;
    clearCart: () => void;
    getSubtotal: () => number;
    updateQuantity: (bookId: number, newQuantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.bookId === item.bookId);
            
            if (existingItem) {
                return prevCart.map(cartItem => 
                    cartItem.bookId === item.bookId
                        ? { ...cartItem, quantity: cartItem.quantity + 1 } // Increase quantity
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }]; // Add new item with quantity 1
            }
        });
    };
    
    const updateQuantity = (bookId: number, newQuantity: number) => {
        if (newQuantity < 1) return; // Prevent negative quantity

        setCart((prevCart) =>
            prevCart.map(cartItem =>
                cartItem.bookId === bookId
                    ? { ...cartItem, quantity: newQuantity }
                    : cartItem
            )
        );
    };

    const removeFromCart = (bookId: number) => {
        setCart((prevCart) => prevCart.filter((c) => c.bookId !== bookId));
    };

    const clearCart = () => {
        setCart(() => []);
    };

    const getSubtotal = () => {
        return cart.reduce((total, item) => total + item.price, 0);
      };

    return (
        <CartContext.Provider 
            value={{cart, addToCart, removeFromCart, clearCart, getSubtotal, updateQuantity }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};