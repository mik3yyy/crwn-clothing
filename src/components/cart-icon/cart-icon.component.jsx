import { CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles';
import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

function CartIcon () {

    const {isCartOpen, setIsIcartOpen, cartCount} = useContext(CartContext);

function toogle (){
    setIsIcartOpen (!isCartOpen);
}
    return (
        <CartIconContainer onClick={toogle}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount  className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;