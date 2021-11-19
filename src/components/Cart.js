import { useSelector, useDispatch } from "react-redux";
import { removeCartProduct, modifyProductQuantity } from "../redux/slices/CartSlice";
import Section from "./Section";
import Button from "./Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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
                    
                    Object.keys(products).length > 0
                    ?
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
                                                    <td>{`US$${products[product_id].data.price.toFixed(2)}`}</td>
                                                    <td>
                                                        <div class="qty-container">
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
                                                        </div>
                                                    </td>
                                                    <td>{`US$${(products[product_id].data.price * products[product_id].qty).toFixed(2)}`}</td>
                                                    <td>
                                                        <button className="btn-close"
                                                            onClick={() => dispatch(removeCartProduct({product_id}))}
                                                        >
                                                            <FontAwesomeIcon icon={faTimes} />
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
                    : <h2>Your Cart is Empty</h2>
            }
            </Section>
            {
                Object.keys(products).length > 0 &&
                    <Button link="/checkout" text="Proceed to Checkout" btnModifier="btn--ghost">Proceed to Checkout</Button>
            }
        </div>
    )
}

export default Cart;