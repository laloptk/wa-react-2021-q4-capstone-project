import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Header = (props) => {  
    return (
        <header className="header">
            <div className="container">
                <div className="header__wrap">                    
                    <div className="site-logo">
                        <Link to="/">furn<span>e-tour</span></Link>
                    </div>
                    
                    <div className="header-nav">
                        <div className="product-search">
                            <form method="get" action="/search">
                                <input type="text" name="q" />
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