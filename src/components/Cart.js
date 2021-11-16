import { useSelector, useDispatch } from "react-redux";
import { removeCartProduct, modifyProductQuantity } from "../redux/slices/CartSlice";
import Section from "./Section";
import { Link } from "react-router-dom";

const Cart = () => {
    const products = useSelector(state => state.cartProducts.list);
    const totalPrice = useSelector(state => state.cartProducts.totalPrice);
    const dispatch = useDispatch();
    
    return (
        <div className="cart">
            <Section sectionName="cart__items" sectionTitle="Shopping Cart" >
                {
                    products &&
                        <table>
                            <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price per unit</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(products).map((product_id) => {
                                        return  <>
                                                <tr key={product_id}>
                                                    <td><img src={products[product_id].data.mainimage.url} alt="" /></td>
                                                    <td>{products[product_id].data.name}</td>
                                                    <td>{products[product_id].data.price}</td>
                                                    <td>
                                                        <input 
                                                            type="number" 
                                                            onChange={(event) => dispatch(modifyProductQuantity({
                                                                product_id,
                                                                qty: event.target.value
                                                            }))}
                                                            value={products[product_id].qty}
                                                        />
                                                    </td>
                                                    <td>{products[product_id].data.price * products[product_id].qty}</td>
                                                    <td>
                                                        <button 
                                                            onClick={() => dispatch(removeCartProduct({product_id}))}
                                                        >
                                                                Remove Product
                                                        </button>
                                                    </td>
                                                </tr>
                                            </>
                                    })
                                }
                            </tbody>
                            <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Total: </th>
                                <th>{`US$${totalPrice.toFixed(2)}`}</th>
                            </tr>
                        </tfoot>
                        </table>
            }
            </Section>
            <Link to="/checkout" >Proceed to Chackout</Link>
        </div>
    )
}

export default Cart;