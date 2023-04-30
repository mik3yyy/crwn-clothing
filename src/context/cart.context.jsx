import { createContext, useState } from "react";

export const CartContext = createContext ( {

    isCartOpen : false ,
    setIsIcartOpen : ()=> {}
});

export const CartProvider = ({children})=> {

    const [isCartOpen, setIsIcartOpen] = useState(false);
    const value = {isCartOpen,setIsIcartOpen}

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>

    )
}