import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

const Header = (props) => { 
    return (
        <header className="header">
            <div className="container">
                <div className="header__wrap">
                    <div className="site-logo">
                        <Button link="/" text={<>furn<span>e-tour</span></>} buttonModifier="btn-logo"/>
                    </div>
                    
                    <div className="header-nav">
                        <div className="product-search">
                            <form>
                                <input type="text" />
                                <button type="submit">     
                                    {<FontAwesomeIcon icon={faSearch} />}
                                </button>
                            </form>
                        </div>
                        <div className="cart-icon">
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;