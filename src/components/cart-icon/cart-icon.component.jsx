import './cart-icon.styles.scss'
import { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import { CartContext } from '../../context/cart.context';

function CartIcon () {

    const {isCartOpen, setIsIcartOpen, cartCount} = useContext(CartContext);

function toogle (){
    setIsIcartOpen (!isCartOpen);
}
    return (
        <div className='cart-icon-container' onClick={toogle}>
            <ShoppingIcon className='shopping-icon'/>
            <span  className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon;