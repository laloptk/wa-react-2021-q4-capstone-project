import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
    const products = useSelector(state => state.cartProducts.list);
    const totalPrice = useSelector(state => state.cartProducts.totalPrice);

    return(
        <div className="checkout">
            <div className="container">
                <div className="checkout__user">
                    <h2>Your Information</h2>
                    <form>
                        <input name="name" type="text" placeholder="Your Full Name"/>
                        <input name="email" type="email" placeholder="Your Email" />
                        <input name="zipcode" type="text" placeholder="Zipcode" />
                        <textarea placeholder="Order Details"/>
                    </form>
                </div>
                <div className="checkout__products">
                    <h2>Your Products</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Product Name
                                </th>
                                <th>
                                    Qantity
                                </th>
                                <th>
                                    Subtotal
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(products).map((product_id, index) => {                                   
                                    return <tr key={product_id}>
                                        <td>
                                            {products[product_id].data.name}
                                        </td>
                                        <td>
                                            {products[product_id].qty}
                                        </td>
                                        <td>
                                            {products[product_id].qty * products[product_id].data.price}
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Total: </th>
                                <th>{`US$${totalPrice.toFixed(2)}`}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div className="container">
                <Link to="/">
                    Place Order
                </Link>
                <Link to="/cart">
                    Go Back to Cart
                </Link>
            </div>
        </div>
    )
}

export default Checkout;