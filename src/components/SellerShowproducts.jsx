import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
 import { useNavigate } from "react-router-dom";

const ProductCard = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    
    const [productId, setProductId] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");
    const [colour, setColour] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:4000/products");
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to load products");
            setLoading(false);
            console.log(err)
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await axios.delete(`http://localhost:4000/products/${id}`);
            fetchProducts();
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    const handleEdit = (product) => {
        setProductId(product._id);
        setTitle(product.title);
        setPrice(product.price);
        setSize(product.size);
        setColour(product.colour);
        setDescription(product.description);
        setShowModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/products/${productId}`, {
                title, price, size, colour, description
            });
            setShowModal(false);
            fetchProducts();
        } catch (err) {
            console.error("Error updating product:", err);
        }
    };

    const handleToggleStatus = async (id, isActive) => {
        try {
            if (isActive) {
                // Soft delete (deactivate)
                await axios.delete(`http://localhost:4000/products/soft/${id}`);
            } else {
                // Restore (activate)
                await axios.put(`http://localhost:4000/products/restore/${id}`);
            }
            fetchProducts(); // Refresh the product list
        } catch (err) {
            console.error("Error toggling product status:", err);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Seller Product List</h2>
            <button className="btn btn-success"  onClick={() => (navigate("/addproduct"))}>Add Product</button>
            {loading && <div className="text-center spinner-border text-primary" role="status"></div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4 mb-4" key={product._id}>
                        <div className="card shadow-sm">
                            <img src={product.image} className="card-img-top" alt={product.title} style={{ height: "200px", objectFit: "cover" }} />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                                <div className="d-flex justify-content-between mt-3">
                                    <FaTrash className="text-danger" style={{ cursor: "pointer" }} title="Delete" onClick={() => handleDelete(product._id)} />
                                    <FaEdit className="text-primary" style={{ cursor: "pointer" }} onClick={() => handleEdit(product)} title="Edit" />
                                    {product.active ? (
                                        <MdToggleOn className="text-success" size={24} style={{ cursor: "pointer" }} title="Deactivate" onClick={() => handleToggleStatus(product._id, true)} />
                                    ) : (
                                        <MdToggleOff className="text-secondary" size={24} style={{ cursor: "pointer" }} title="Activate" onClick={() => handleToggleStatus(product._id, false)} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bootstrap Modal */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Product</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleUpdate}>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Size</label>
                                        <input type="text" className="form-control" value={size} onChange={(e) => setSize(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Colour</label>
                                        <input type="text" className="form-control" value={colour} onChange={(e) => setColour(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-3">Update Product</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCard;
