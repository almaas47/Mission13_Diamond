import { useNavigate, useParams } from "react-router-dom";
import WelcomeBook from "../components/WelcomeBook";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { CartItem } from "../types/CartItem";

function DonatePage () {
    const navigate = useNavigate();
    const { author, bookId} = useParams();
    const {addToCart} = useCart();
    const [donationAmount, setDonationAmount] = useState<number>(0);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookId: Number(bookId),
            title: `Donation for ${author}`,
            price: donationAmount,
            quantity: 1,
            author: author || "No Author Found",
            donationAmount
        };
        addToCart(newItem);
        navigate('/cart');
    }
    

    return (
        <>
            <WelcomeBook />
            <h2>Donate to {author}</h2>

            <div>
                <input 
                    type="number" 
                    placeholder="Enter donation amount" 
                    value={donationAmount} 
                    onChange={(x) => setDonationAmount(Number(x.target.value))}
                />
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>

            <button onClick={() => navigate(-1)}>Go Back</button>
        </>
    );
}

export default DonatePage;