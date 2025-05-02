import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SellerHeader from "./SellerHeader";
import SellerSidebar from "./SellerSidebar";

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

  const userid = localStorage.getItem("userid");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/products/getsellerproduct/${userid}`);
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load products");
      setLoading(false);
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
        await axios.delete(`http://localhost:4000/products/soft/${id}`);
      } else {
        await axios.put(`http://localhost:4000/products/restore/${id}`);
      }
      fetchProducts();
    } catch (err) {
      console.error("Error toggling product status:", err);
    }
  };

  return (
    <>
        <SellerHeader />
      <div className="d-flex">
        <SellerSidebar />
        <div className="container mt-4">
          <h2 className="text-center mb-4">Seller Product List</h2>
          <button className="btn btn-success mb-3" onClick={() => navigate("/addproduct")}>
            Add Product
          </button>

          {loading && <div className="text-center spinner-border text-primary" role="status"></div>}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price ($)</th>
                    <th>Size</th>
                    <th>Colour</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={product.image}
                          alt={product.title}
                          style={{ height: "60px", width: "60px", objectFit: "cover" }}
                        />
                      </td>
                      <td>{product.title}</td>
                      <td>${product.price}</td>
                      <td>{product.size}</td>
                      <td>{product.colour}</td>
                      <td>
                        {product.active ? (
                          <span className="badge bg-success">Active</span>
                        ) : (
                          <span className="badge bg-secondary">Inactive</span>
                        )}
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <FaEdit
                            className="text-primary"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEdit(product)}
                            title="Edit"
                          />
                          <FaTrash
                            className="text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(product._id)}
                            title="Delete"
                          />
                          {product.active ? (
                            <MdToggleOn
                              className="text-success"
                              size={24}
                              style={{ cursor: "pointer" }}
                              title="Deactivate"
                              onClick={() => handleToggleStatus(product._id, true)}
                            />
                          ) : (
                            <MdToggleOff
                              className="text-secondary"
                              size={24}
                              style={{ cursor: "pointer" }}
                              title="Activate"
                              onClick={() => handleToggleStatus(product._id, false)}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Edit Modal */}
          {showModal && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Update Product</h5>
                    <button type="button" className="close" onClick={() => setShowModal(false)}>
                      &times;
                    </button>
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
      </div>
    </>
  );
};

export default ProductCard;
