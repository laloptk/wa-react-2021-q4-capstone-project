import { useSelector, useDispatch } from "react-redux";
import { removeCartProduct, modifyProductQuantity } from "../redux/slices/CartSlice";
import Section from "./Section";
import { Link } from "react-router-dom";

const Cart = () => {
    const products = useSelector(state => state.cartProducts.list);
    const totalPrice = useSelector(state => state.cartProducts.totalPrice);
    const dispatch = useDispatch();

    const handleQtyIncrease = (product_id) => {
        if(products[product_id].qty < products[product_id].data.stock) {
            dispatch(modifyProductQuantity({
                product_id,
                qty: products[product_id].qty + 1
            }))
        }
    }

    const handleQtyDecrease = (product_id) => {
        if(products[product_id].qty > 1) {
            dispatch(modifyProductQuantity({
                product_id,
                qty: products[product_id].qty - 1
            }))
        }
    }
    
    return (
        <div className="cart">
            <Section sectionName="cart__items" sectionTitle="Shopping Cart" >
                {
                    /*products.length > 0
                    ?*/
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
                                        return  <tr key={product_id}>
                                                    <td><img src={products[product_id].data.mainimage.url} alt="" /></td>
                                                    <td>{products[product_id].data.name}</td>
                                                    <td>{products[product_id].data.price}</td>
                                                    <td>
                                                        <div className="plus-btn">
                                                            <button onClick={() => handleQtyIncrease(product_id)}>+</button>
                                                        </div>
                                                        <input 
                                                            readOnly
                                                            type="text" 
                                                            value={products[product_id].qty}
                                                        />
                                                        <div className="minus-btn">
                                                            <button onClick={() => handleQtyDecrease(product_id)}>-</button>
                                                        </div>
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
                    //: <h2>There are no products in the Cart</h2>
            }
            </Section>
            <Link to="/checkout" >Proceed to Checkout</Link>
        </div>
    )
}

export default Cart;