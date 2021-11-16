import { useSelector, useDispatch } from "react-redux";
import { removeCartProduct } from "../redux/slices/CartSlice";
import Section from "./Section";

const Cart = () => {
    const products = useSelector(state => state.cartProducts.list);
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
                                                    <td><input type="number" defaultValue={products[product_id].qty}/></td>
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
                        </table>
            }
            </Section>
        </div>
    )
}

export default Cart;