import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const AddressList = () => {
    const [addresses, setAddresses] = useState([]);
    const [editingAddress, setEditingAddress] = useState(null);
    const [updatedAddress, setUpdatedAddress] = useState({});
    const userId = localStorage.getItem("userid");

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/address/${userId}`);
            if (Array.isArray(response.data)) {
                setAddresses(response.data);
            } else {
                setAddresses([]);
            }
        } catch (error) {
            console.error("Error fetching addresses:", error);
            setAddresses([]);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/address/${id}`);
            setAddresses(addresses.filter(address => address._id !== id));
        } catch (error) {
            console.error("Error deleting address:", error);
        }
    };

    const handleEdit = (address) => {
        setEditingAddress(address._id);
        setUpdatedAddress({ ...address });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:4000/address/${editingAddress}`, updatedAddress);
            setAddresses(addresses.map(addr => (addr._id === editingAddress ? updatedAddress : addr)));
            setEditingAddress(null);
        } catch (error) {
            console.error("Error updating address:", error);
        }
    };

    return (
        <>
            <Header />
            <div className='d-flex'>
                <Sidebar />
        <div className="container mt-3">
            <h4>Saved Addresses</h4>
            {addresses.length === 0 ? (
                <p>No addresses found.</p>
            ) : (
                <div className="row">
                    {addresses.map((address) => (
                        <div key={address._id} className="col-md-4 mb-3">
                            <div className="card p-3 shadow">
                                {editingAddress === address._id ? (
                                    <div>
                                        <input type="text" className="form-control mb-2" value={updatedAddress.street} onChange={(e) => setUpdatedAddress({...updatedAddress, street: e.target.value})} placeholder="Street" />
                                        <input type="text" className="form-control mb-2" value={updatedAddress.city} onChange={(e) => setUpdatedAddress({...updatedAddress, city: e.target.value})} placeholder="City" />
                                        <input type="text" className="form-control mb-2" value={updatedAddress.state} onChange={(e) => setUpdatedAddress({...updatedAddress, state: e.target.value})} placeholder="State" />
                                        <input type="text" className="form-control mb-2" value={updatedAddress.postalCode} onChange={(e) => setUpdatedAddress({...updatedAddress, postalCode: e.target.value})} placeholder="Postal Code" />
                                        <input type="text" className="form-control mb-2" value={updatedAddress.country} onChange={(e) => setUpdatedAddress({...updatedAddress, country: e.target.value})} placeholder="Country" />
                                        <input type="text" className="form-control mb-2" value={updatedAddress.phone} onChange={(e) => setUpdatedAddress({...updatedAddress, phone: e.target.value})} placeholder="Phone" />
                                        <button className="btn btn-success btn-sm me-2" onClick={handleUpdate}>Save</button>
                                        <button className="btn btn-secondary btn-sm" onClick={() => setEditingAddress(null)}>Cancel</button>
                                    </div>
                                ) : (
                                    <>
                                        <h6>{address.street}, {address.city}, {address.state}</h6>
                                        <p>Postal Code: {address.postalCode}</p>
                                        <p>Country: {address.country}</p>
                                        <p>Phone: {address.phone}</p>
                                        <div>
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(address)}>
                                                <FaEdit /> Edit
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(address._id)}>
                                                <FaTrash /> Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <button className="btn btn-primary mt-3" onClick={() => window.location.href = "/addaddress"}>Add New Address</button>
        </div>
        </div>
        <Footer/>
        </>
    );
};

export default AddressList;
