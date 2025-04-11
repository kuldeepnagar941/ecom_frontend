import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);
    const userId = localStorage.getItem("userid");

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/wishlist/${userId}`);
                setWishlist(response.data);
            } catch (error) {
                console.error("Error fetching wishlist", error);
            }
        };

        fetchWishlist();
    }, [userId]);

    const handleRemoveFromWishlist = async (productId) => {
        try {
            await axios.delete("http://localhost:4000/wishlist/remove", {
                data: { userId, productId }
            });
            setWishlist(wishlist.filter(item => item._id !== productId));
        } catch (error) {
            console.error("Error removing from wishlist", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">My Wishlist</h2>
            <button className="btn btn-primary" onClick={() => navigate("/showproduct")}>Back to Products</button>

            <div className="row">
                {wishlist.length > 0 ? wishlist.map((product) => (
                    <div className="col-md-4 mb-4" key={product._id}>
                        <div className="card shadow-sm">
                            <img src={product.image} className="card-img-top" alt={product.title} style={{ height: "200px", objectFit: "cover" }} />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                                <button className="btn btn-danger" onClick={() => handleRemoveFromWishlist(product._id)}>Remove</button>
                            </div>
                        </div>
                    </div>
                )) : <p className="text-center">Your wishlist is empty.</p>}
            </div>
        </div>
    );
};

export default Wishlist;
