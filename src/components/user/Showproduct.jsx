import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const ProductCard = () => {
    // const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:4000/products/alluserproduct");
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load products");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleViewProduct = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleAddToCart = async (product) => {
        const userId = localStorage.getItem("userid");

        if (!userId) {
            alert("Please log in to add items to your cart.");
            // navigate("/login"); // Uncomment if redirect to login is desired
            return;
        }

        try {
            await axios.post("http://localhost:4000/cart/add", {
                productId: product._id,
                userId
            });
            alert(`${product.title} has been added to the cart!`);
        } catch (error) {
            alert("Failed to add product to cart.");
        }
    };

    const handleAddToWishlist = async (product) => {
        const userId = localStorage.getItem("userid");

        if (!userId) {
            alert("Please log in to add items to your wishlist.");
            // navigate("/login"); // Uncomment if redirect to login is desired
            return;
        }

        try {
            await axios.post("http://localhost:4000/wishlist/add", {
                userId,
                productId: product._id
            });
            alert(`${product.title} added to wishlist!`);
        } catch (error) {
            alert("Failed to add product to wishlist.");
        }
    };

    return (
        <>
            <Header />
            <div className="d-flex">
                <Sidebar />
                <div className="container mt-4 flex-grow-1">
                    <h2 className="text-center mb-4">📦 Product List</h2>

                    {loading && <p className="text-center">Loading...</p>}
                    {error && <p className="alert alert-danger text-center">{error}</p>}

                    <div className="row">
                        {products.map((product) => (
                            <div className="col-md-4 mb-4" key={product._id}>
                                <div className="card h-100">
                                    <img
                                        src={product.image}
                                        className="card-img-top"
                                        alt={product.title}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                                        <div className="mt-auto">
                                            <button className="btn btn-info btn-sm me-2" onClick={() => handleViewProduct(product)}>View</button>
                                            <button className="btn btn-success btn-sm me-2" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleAddToWishlist(product)}>
                                                <FaHeart /> Wishlist
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Modal for Product Details */}
                    {showModal && selectedProduct && (
                        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Product Details</h5>
                                        <button className="btn-close" onClick={() => setShowModal(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <img src={selectedProduct.image} className="img-fluid mb-3" alt={selectedProduct.title} />
                                        <h5>{selectedProduct.title}</h5>
                                        <p><strong>Price:</strong> ${selectedProduct.price}</p>
                                        <p><strong>Size:</strong> {selectedProduct.size || "N/A"}</p>
                                        <p><strong>Colour:</strong> {selectedProduct.colour || "N/A"}</p>
                                        <p><strong>Description:</strong> {selectedProduct.description}</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                        <button className="btn btn-success" onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</button>
                                        <button className="btn btn-danger" onClick={() => handleAddToWishlist(selectedProduct)}><FaHeart /> Wishlist</button>
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

export default ProductCard;
