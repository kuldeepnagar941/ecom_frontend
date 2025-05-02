import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const Cart = () => {
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
        setLoading(true);
        const userId = localStorage.getItem("userid");
        if (!userId) {
            setError("User not found");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:4000/cart/${userId}`);
            setCart(response.data);
        } catch (err) {
            setError("Failed to load cart");
            console.error("Cart fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAddresses = async () => {
        const userId = localStorage.getItem("userid");
        try {
            const response = await axios.get(`http://localhost:4000/address/${userId}`);
            setAddresses(response.data);
        } catch (err) {
            console.error("Error fetching addresses:", err);
        }
    };

    const updateQuantity = async (cartId, productId, totalQuantity) => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:4000/cart/update/${cartId}`, {
                productId,
                totalQuantity,
            });
            await fetchCart();
        } catch (err) {
            setError("Failed to update quantity");
            console.error("Quantity update error:", err);
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (cartId, productId) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:4000/cart/remove/${cartId}/${productId}`);
            await fetchCart();
        } catch (err) {
            // setError("Failed to remove item");
            console.error("Remove item error:", err);
        } finally {
            setLoading(false);
        }
    };

    const placeOrder = async () => {
        const userId = localStorage.getItem("userid");
        if (!selectedAddress) {
            alert("Please select an address");
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
                    userId,
                    payment_mode: paymentMode,
                };

                const response = await axios.post("http://localhost:4000/sellerorder", requestData);

                if (response.data.success === false) {
                    alert(response.data.message);
                    return;
                }
            }

            alert("Order placed successfully!");
            setShowModal(false);
            fetchCart();
        } catch (error) {
            console.error("Order error:", error);
            alert("Failed to place order");
        }
    };

    return (
        <>
            <Header />
            <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 container mt-4">
                    <h2 className="text-center mb-4">🛒 Your Cart</h2>

                    {loading && (
                        <div className="text-center my-4">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}

                    {error && <p className="alert alert-danger text-center">{error}</p>}

                    {!loading && cart && cart.items.length > 0 ? (
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
                                                    onClick={() =>
                                                        updateQuantity(cart._id, item.product._id, item.quantity + 1)
                                                    }
                                                >
                                                    +
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm mx-1"
                                                    onClick={() =>
                                                        updateQuantity(cart._id, item.product._id, item.quantity - 1)
                                                    }
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <button
                                                    className="btn btn-warning btn-sm mx-1"
                                                    onClick={() => removeItem(cart._id, item.product._id)}
                                                >
                                                    🗑️ Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <button
                                className="btn btn-primary mt-3"
                                onClick={() => {
                                    setShowModal(true);
                                    fetchAddresses();
                                }}
                            >
                                Place Order
                            </button>
                        </>
                    ) : (
                        !loading && <p className="text-center">Your cart is empty.</p>
                    )}

                    {/* Modal for Address and Payment */}
                    {showModal && (
                        <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
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
                                                <input
                                                    type="radio"
                                                    name="address"
                                                    value={addr._id}
                                                    onChange={() => setSelectedAddress(addr._id)}
                                                />{" "}
                                                {addr.street}, {addr.city}, {addr.state}
                                            </div>
                                        ))}
                                        <h6 className="mt-3">Select Payment Mode:</h6>
                                        <select
                                            className="form-control"
                                            onChange={(e) => setPaymentMode(e.target.value)}
                                        >
                                            <option value="COD">Cash on Delivery</option>
                                            <option value="Online">Online Payment</option>
                                        </select>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-success" onClick={placeOrder}>
                                            Submit
                                        </button>
                                        <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;
