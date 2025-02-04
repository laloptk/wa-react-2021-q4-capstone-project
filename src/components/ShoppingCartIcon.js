import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const ShoppingCartIcon = () => {   
    const totalCartItems = useSelector(state => state.cartProducts.total);

    return(
        <div className="cart-icon">
            <div className="items-num">{totalCartItems > 0 ? totalCartItems : ""}</div>
            <Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} /></Link>
        </div>
    )
}

export default ShoppingCartIcon;