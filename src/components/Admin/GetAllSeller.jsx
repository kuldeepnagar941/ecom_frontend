import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const GetAllSeller = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getallseller")
      .then((res) => setSellers(res.data))
      .catch((err) => console.error("Error fetching sellers:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">All Sellers</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Shop Name</th>
            <th>GST</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <tr key={seller._id}>
              <td>{seller.userId?.name}</td>
              <td>{seller.userId?.email}</td>
              <td>{seller.userId?.phone}</td>
              <td>{seller.shopname}</td>
              <td>{seller.gst}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllSeller;
