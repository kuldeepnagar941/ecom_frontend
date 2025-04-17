import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductQuantity() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:4000/inventory');
        setProducts(res.data);

        // Initialize quantity input fields to empty
        const initialQuantities = {};
        res.data.forEach((product) => {
          initialQuantities[product._id] = '';
        });
        setQuantities(initialQuantities);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (inventoryId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [inventoryId]: value,
    }));
  };

  const handleUpdateQuantity = async (inventoryId) => {
    try {
      const addQuantity = parseInt(quantities[inventoryId], 10);

      if (isNaN(addQuantity) || addQuantity < 0) {
        alert('Please enter a valid quantity.');
        return;
      }

      await axios.put(`http://localhost:4000/inventory/${inventoryId}`, {
        quantity: addQuantity,
      });

      alert('Quantity updated!');

      // Refresh product list after update
      const res = await axios.get('http://localhost:4000/inventory');
      setProducts(res.data);
      setQuantities((prev) => ({
        ...prev,
        [inventoryId]: '',
      }));
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert('Failed to update quantity.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Product Inventory</h2>
      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '10px',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <img
            src={product.productId.image}
            alt={product.productId.title}
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
          <div>
            <h3>{product.productId.title}</h3>
            <p>Price: ${product.productId.price}</p>
            <p>Current Quantity: <strong>{product.quantity}</strong></p>

            <input
              type="number"
              placeholder="Add quantity"
              value={quantities[product._id] || ''}
              onChange={(e) =>
                handleInputChange(product._id, e.target.value)
              }
              style={{ padding: '5px' }}
            />
            <button
              onClick={() => handleUpdateQuantity(product._id)}
              style={{ marginLeft: '10px', padding: '5px 10px' }}
            >
              Add Quantity
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductQuantity;
