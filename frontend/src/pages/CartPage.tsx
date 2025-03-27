import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
    const navigate = useNavigate();
    const {cart, removeFromCart} = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    
    return(
        <div>
            <h2>Your cart</h2>
            <div>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {cart.map((item: CartItem) => (
                            <li key={item.bookID}>
                                {item.title} by {item.author} : ${item.price.toFixed(2)}
                                <button onClick={() => removeFromCart(item.bookID)}>Remove</button>
                            </li>
                    ))}
                    </ul>
                )}
            </div>
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <button onClick={() => navigate('/books')}>Continue Browsing</button>
            {/* <button>Checkout</button> */}
        </div>
    );
}

export default CartPage;