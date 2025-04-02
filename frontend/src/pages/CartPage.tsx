import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity } = useCart();
    const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

    // Calculate the subtotal
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className="container mt-4">
            <h2>Your Cart</h2>
            <div className="card p-3">
                {cart.length === 0 ? (
                    <p className="text-muted">Your cart is empty.</p>
                ) : (
                    <ul className="list-group">
                        {cart.map((item: CartItem) => (
                            <li key={item.bookId} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{item.title}</strong>: ${item.price.toFixed(2)} x 
                                    <input 
                                        type="number" 
                                        value={item.quantity} 
                                        min="1"
                                        onChange={(e) => updateQuantity(item.bookId, Number(e.target.value))}
                                        className="form-control d-inline mx-2"
                                        style={{ width: "60px" }}
                                    />
                                    = ${ (item.price * item.quantity).toFixed(2) }
                                </div>
                                <button className="btn btn-danger btn-sm" onClick={() => setSelectedItem(item)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <h3 className="mt-3">Total: <span className="text-success">${subtotal}</span></h3>

            <div className="mt-3">
                <button className="btn btn-primary me-2">Checkout</button>
                <button className="btn btn-secondary" onClick={() => navigate('/books')}>Continue Shopping</button>
            </div>

            {/* Bootstrap Modal for Confirmation */}
            {selectedItem && (
                <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Removal</h5>
                                <button type="button" className="btn-close" onClick={() => setSelectedItem(null)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to remove <strong>{selectedItem.title}</strong> from your cart?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" onClick={() => { 
                                    removeFromCart(selectedItem.bookId); 
                                    setSelectedItem(null); 
                                }}>
                                    Yes, Remove
                                </button>
                                <button className="btn btn-secondary" onClick={() => setSelectedItem(null)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;
