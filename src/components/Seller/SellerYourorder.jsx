import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SellerHeader from './SellerHeader';
import SellerSidebar from './SellerSidebar';

function SellerYourOrder() {
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem("userid");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/sellerorder/getsellerorder/${userId}`);
                if (response.data && Array.isArray(response.data.order)) {
                    setOrders(response.data.order);
                } else {
                    console.error("Unexpected response:", response.data);
                    setOrders([]);
                }
            } catch (err) {
                console.error("Error fetching seller orders:", err);
                setOrders([]);
            }
        };
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await axios.patch(`http://localhost:4000/sellerorder/${orderId}`, {
                status: newStatus,
            });

            if (response.data.success) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                console.error("Failed to update status:", response.data.message);
            }
        } catch (err) {
            console.error("Error updating order status:", err);
        }
    };

    return (
        <>
            <SellerHeader />
            <div className="d-flex">
                <SellerSidebar />

                <div className="container mt-4">
                    <h2 className="text-center mb-4">Seller Orders</h2>

                    {orders.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Current Status</th>
                                        <th>Change Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr key={order._id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img
                                                    src={order.productId.image}
                                                    alt={order.productId.title}
                                                    style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                                />
                                            </td>
                                            <td>{order.productId.title}</td>
                                            <td>${order.productId.price}</td>
                                            <td>{order.status}</td>
                                            <td>
                                                <select
                                                    className="form-select"
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                >
                                                    <option value="">Select</option>
                                                    {order.status === "initinate" && (
                                                        <>
                                                            <option value="Cancelled">Cancelled</option>
                                                            <option value="Package">Package</option>
                                                        </>
                                                    )}
                                                    {order.status === "Package" && (
                                                        <option value="Delivery">Delivery</option>
                                                    )}
                                                    {order.status === "Return" && (
                                                        <option value="Approve">Approve</option>
                                                    )}
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center">No orders found</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default SellerYourOrder;
