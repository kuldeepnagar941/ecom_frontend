import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMode, setPaymentMode] = useState("COD");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        const userid = localStorage.getItem("userid");
        if (!userid) {
            setError("User not found");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:4000/cart/${userid}`);
            setCart(response.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to load cart");
            setLoading(false);
            console.error("Cart fetch error:", err);
        }
    };

    const fetchAddresses = async () => {
        const userid = localStorage.getItem("userid");
        try {
            const response = await axios.get(`http://localhost:4000/address/${userid}`);
            setAddresses(response.data);
        } catch (err) {
            console.error("Error fetching addresses:", err);
        }
    };

    const updateQuantity = async (cartId, productId, totalQuantity) => {
        if (!cartId) {
            setError("Cart ID not found");
            console.error("Cart ID is missing");
            return;
        }
    
        console.log(`Updating quantity for Cart ID: ${cartId}, Product ID: ${productId}, Quantity: ${totalQuantity}`);
    
        try {
            await axios.put(`http://localhost:4000/cart/update/${cartId}`, {
                productId,
                totalQuantity,
            });
            
            fetchCart();
        } catch (err) {
            setError("Failed to update quantity");
            console.error("Quantity update error:", err);
        }
    };

    const placeOrder = async () => {
        const userid = localStorage.getItem("userid");

        if (!selectedAddress) {
            alert("Please select an address");
            return;
        }

        await order(userid);
        setShowModal(false);
        fetchCart();
    };

    const order = async (userid) => {
        if (!cart || !cart.items || cart.items.length === 0) {
            alert("Cart is empty or invalid");
            return;
        }

        try {
            for (const item of cart.items) {
                const requestData = {
                    sellerId: item.product.sellerId,
                    productId: item.product._id,
                    addressId: selectedAddress,
                    quantity: item.quantity,
                    status: "initiate",
                    userId: userid,
                    payment_mode: paymentMode
                };

                const response = await axios.post("http://localhost:4000/sellerorder", requestData);

                if (response.data.success === false) {
                    console.error("Seller order error:", response.data.message);
                    alert(response.data.message);
                    return;
                } else {
                    console.log("Seller order placed:", response.data.message);
                }
            }

            alert("All seller orders placed successfully!");
        } catch (error) {
            console.error("Error placing seller orders:", error.response?.data || error.message);
            alert("An error occurred while placing your order.");
        }
    };
    
    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">🛒 Your Cart</h2>
            <button className="btn btn-success" onClick={() => navigate("/showproduct")}>
                Show Products
            </button>

            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="alert alert-danger text-center">{error}</p>}

            {cart && cart.items.length > 0 ? (
                <>
                    <table className="table table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.items.map((item) => (
                                <tr key={item.product._id}>
                                    <td>
                                        <img
                                            src={item.product.image} 
                                            alt={item.product.title}
                                            width="50"
                                            height="50"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </td>
                                    <td>{item.product.title}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <button
                                            className="btn btn-success btn-sm mx-1"
                                            onClick={() => updateQuantity(cart._id, item.product._id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm mx-1"
                                            onClick={() => updateQuantity(cart._id, item.product._id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-primary mt-3" onClick={() => { setShowModal(true); fetchAddresses(); }}>
                        Place Order
                    </button>
                </>
            ) : (
                <p className="text-center">Your cart is empty.</p>
            )}

            {showModal && (
                <div className="modal show d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Select Address & Payment</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <h6>Select Address:</h6>
                                {addresses.map((addr) => (
                                    <div key={addr._id}>
                                        <input type="radio" name="address" value={addr._id} onChange={() => setSelectedAddress(addr._id)} />
                                        {addr.street}, {addr.city}, {addr.state}
                                    </div>
                                ))}
                                <h6 className="mt-3">Select Payment Mode:</h6>
                                <select className="form-control" onChange={(e) => setPaymentMode(e.target.value)}>
                                    <option value="COD">Cash on Delivery</option>
                                    <option value="Online">Online Payment</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-success" onClick={placeOrder}>Submit</button>
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
