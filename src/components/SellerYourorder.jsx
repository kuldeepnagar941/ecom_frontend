import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SellerYourOrder() {
    const [orders, setOrders] = useState([]);
    
    // const statusOptions = ["Cancel", "Packing", "Delivery", "Return", "Approve", "Returned"];
    const userId = localStorage.getItem("userid");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/sellerorder/getsellerorder/${userId}`);
                if (response.data && Array.isArray(response.data.order)) {
                    setOrders(response.data.order);
                    // console.log(orders);
                } else {
                    console.error(" array :", response.data);
                    setOrders([]);
                }
            } catch (err) {
                console.error("Error he fetching seller orders:", err);
                setOrders([]);
            }
        };

        fetchOrders();
    }, [userId]);



    

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            console.log(`newStatus>>>>>`,newStatus);
            
            const response = await axios.patch(`http://localhost:4000/sellerorder/${orderId}`, {
                status: newStatus,
               
            });
            console.log(response)
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
        <div className="container mt-4">
            <h2 className="text-center mb-4">Seller Orders</h2>
            <div className="row">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div className="col-md-4 mb-4" key={order._id}>
                            <div className="card shadow-sm">
                                <img
                                    src={order.productId.image}
                                    className="card-img-top"
                                    alt={order.productId.title}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{order.productId.title}</h5>
                                    <p className="card-text"><strong>Price:</strong> ${order.productId.price}</p>
                                    <p className="card-text"><strong>Current Status:</strong> {order.status}</p>
                                    <select
                                        className="form-select mt-2"
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    >   
                                        <option value="">Select</option>
                                        {order.status ==="initinate" && <option value="Cancelled">Cancelled</option>}
                                        {order.status ==="initinate" &&<option value="Package">Package</option>}
                                        {order.status ==  "Package" && (<option value="Delivery">Delivery</option>)}
                                        {order.status ===   "Return" &&<option value="Approve">Approve</option>}
    
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No orders found</p>
                )}
            </div>
        </div>
    );
}

export default SellerYourOrder;
