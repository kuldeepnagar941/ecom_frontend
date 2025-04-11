import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";



const ProductCard = () => {

    const Navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
   
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:4000/products");
                setProducts(response.data);
                console.log(response)
                setLoading(false);
            } catch (err) {
                setError("Failed to load products");
                setLoading(false);
                console.log(err)
            }
        };

        fetchProducts();
    }, []);

    const handleViewProduct = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleAddToCart = async (product) => {
        const userid = (localStorage.getItem("userid")); // Ensure user is properly parsed
    
        
    
        try {
            const response = await axios.post(
                "http://localhost:4000/cart/add", 
                { 
                    productId: product._id, 
                    userId: userid 
                }
            );
    
            alert(`${product.title} has been added to the cart!`);
            console.log("Cart Response:", response.data);
        } catch (error) {
            console.error("Error adding to cart:", error.response?.data || error.message);
            alert("Failed to add product to cart.");
        }

    }
        const handleAddToWishlist = async (product) => {
            const userId = localStorage.getItem("userid");
            try {
                await axios.post("http://localhost:4000/wishlist/add", { userId, productId: product._id });
                alert(`${product.title} added to wishlist!`);
            } catch (error) {
                console.error("Error adding to wishlist", error);
                alert("Failed to add product to wishlist.");
            }
        
       }
    

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Product List</h2>
            <button className="btn btn-success"  onClick={() => (Navigate("/cart"))}>Go to Cart</button>
            <button className="btn btn-success"  onClick={() => (Navigate("/showwishlist"))}>Go to Wishlist</button>

    
            {loading && (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            
            {error && <div className="alert alert-danger text-center">{error}</div>}

        
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4 mb-4" key={product._id}>
                        <div className="card shadow-sm">
                            <img
                                src={product.image}
                                className="card-img-top"
                                alt={product.title}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text"><strong>Price:</strong> ${product.price}</p>

                                
                                <div className="d-flex justify-content-between">
                                    <button 
                                        className="btn btn-info" 
                                        onClick={() => handleViewProduct(product)}
                                    >
                                        View
                                    </button>
                                    <button 
                                        className="btn btn-success" 
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Add to Cart
                                    </button>
                                    <button className="btn btn-success" onClick={() => handleAddToWishlist(product)}>
                                        <FaHeart color="red" /> Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            
            {showModal && selectedProduct && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Product Details</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <img 
                                    src={selectedProduct.image} 
                                    alt={selectedProduct.title} 
                                    className="img-fluid mb-3" 
                                />
                                <h5>{selectedProduct.title}</h5>
                                <p><strong>Price:</strong> ${selectedProduct.price}</p>
                                <p><strong>Size:</strong> {selectedProduct.size || "N/A"}</p>
                                <p><strong>Colour:</strong> {selectedProduct.colour || "N/A"}</p>
                                <p><strong>Description:</strong> {selectedProduct.description}</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                {/* <button className="btn btn-success" onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</button> */}
                                <button className="btn btn-success" onClick={() => handleAddToCart(selectedProduct)}>Add to Cart </button>
                                <button className="btn btn-success" onClick={() => handleAddToWishlist(selectedProduct)}><FaHeart color="red" /> Wishlist </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCard;
