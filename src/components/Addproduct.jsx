import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {

    const Navigate = useNavigate();

    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");
    const [colour, setColour] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const userId = localStorage.getItem("userid");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = {
            image,
            title,
            price,
            size,
            colour,
            quantity,

            description,
            sellerId:userId
        };
        console.log(productData)

        try {
            const response = await axios.post("http://localhost:4000/products", productData);
            setMessage("Product added successfully!");
            console.log("Response:", response.data);

            // Reset form after successful submission
            setImage("");
            setTitle("");
            setPrice("");
            setSize("");
            setColour("");
            setDescription("");
            setQuantity("");
        } catch (error) {
            console.error("Error submitting product:", error);
            setMessage("Failed to add product.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Add Product</h2>
            <button className="btn btn-success"  onClick={() => (Navigate("/sellershowproduct"))}>Show Product</button>
            {message && <div className={`alert ${message.includes("Failed") ? "alert-danger" : "alert-success"}`}>{message}</div>}
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-light">
                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input type="text" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Price ($)</label>
                    <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Sizes </label>
                    <input type="text" className="form-control" value={size} onChange={(e) => setSize(e.target.value)}  required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Colours </label>
                    <input type="text" className="form-control" value={colour} onChange={(e) => setColour(e.target.value)}  required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Quantity </label>
                    <input type="text" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)}  required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    );
};

export default ProductForm;
