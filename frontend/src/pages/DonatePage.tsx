import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
// import { useState } from "react";
import { CartItem } from "../types/CartItem";

function DonatePage() {
    const navigate = useNavigate();
    // const {title, author, price, bookID} = useParams();
    const { title, author, price: priceParam, bookID } = useParams();
    const price = Number(priceParam);
    const { addToCart } = useCart();
    // const [itemPrice, setItemPrice] = useState<number>(0);
    

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookID: Number(bookID),
            title: title || "Unknown Title",
            author: author || "Unknown Author",
            price: Number(price) || 0,
        };
        addToCart(newItem);
        navigate('/cart');
    }

    return (
        <>
        <WelcomeBand />
        <h2>"{title}" by {author}</h2>
        
        <div>
             <label>Price: $</label>
            <input 
                type="number" 
                value={`${price}`} 
                readOnly
            />
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>

        <button onClick={() => navigate(-1)}>Go Back</button>
        </>
    );
}

export default DonatePage;