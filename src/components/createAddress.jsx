import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000/address';

const AddressForm = () => {
    const [formData, setFormData] = useState({
        street: '', city: '', state: '', postalCode: '', country: '', phone: ''
    });
    const [editingId, setEditingId] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Get userId from localStorage
        const userId = localStorage.getItem("userid"); 
        console.log(userId)
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }

        const addressData = { ...formData, userId }; 

        try {
            if (editingId) {
                const response=await axios.put(`${API_URL}/${editingId}`, addressData);
                console.log(response)
                if(response.status== 201){
                    alert("data saved")
                }
            } else {
                const response =await axios.post(API_URL, addressData);
                console.log(response)
                if(response.status== 201){
                    alert("data saved yes")
                }
            }
            setFormData({ street: '', city: '', state: '', postalCode: '', country: '', phone: '' });
            setEditingId(null);
        } catch (error) {
            console.error("Error saving address:", error);
        }
    };

    return (
        <div className="container mt-3">
            <h4>{editingId ? 'Edit Address' : 'Add Address'}</h4>
            <form onSubmit={handleSubmit} className="card p-3 shadow">
                <div className="mb-2">
                    <label className="form-label">Street</label>
                    <input type="text" className="form-control" name="street" value={formData.street} onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <label className="form-label">Postal Code</label>
                    <input type="text" className="form-control" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <label className="form-label">Country</label>
                    <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Submit'}</button>
            </form>
        </div>
    );
};

export default AddressForm;
