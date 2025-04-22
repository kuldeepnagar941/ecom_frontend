


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  BarChart,Bar,  XAxis,YAxis,CartesianGrid,Tooltip,  Legend, ResponsiveContainer,} from 'recharts';

const DashBorad = () => {
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:4000/admin/getalluser');
        const data = await res.json();
        setUsers(data || []);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await fetch('http://localhost:4000/admin/getallseller');
        const data = await res.json();
        setSellers(data || []);
      } catch (error) {
        console.error('Failed to fetch sellers:', error);
      }
    };
    fetchSellers();
  }, []);

  const barChartData = [
    { name: 'Jan', Profit: 4000, Costing: 2400 },
    { name: 'Feb', Profit: 3000, Costing: 1398 },
    { name: 'Mar', Profit: 2000, Costing: 9800 },
    { name: 'Apr', Profit: 2780, Costing: 3908 },
    { name: 'May', Profit: 1890, Costing: 4800 },
    { name: 'Jun', Profit: 2390, Costing: 3800 },
    { name: 'Jul', Profit: 3490, Costing: 4300 },
  ];

  return (
    <>
    <div className="container py-4">
      <h4 className="fw-bold mb-4">E-Commerce &gt; Admin Dashboard</h4>

      <div className="row">
        {/* LEFT SIDE: ALL CARDS */}
        <div className="col-md-6">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="p-3 bg-primary text-white rounded shadow-sm">
                <h5>Wallet</h5>
                <h3>$00.00</h3>
                <small className="text-white-50">↑ 00% Last Month</small>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-danger text-white rounded shadow-sm">
                <h5>Total Product</h5>
                <h3>00.00k</h3>
                <small className="text-white-50">↓ 0.0% Last Month</small>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-success text-white rounded shadow-sm text-center" style={{ cursor: 'pointer' }} onClick={() => navigate('/getalluseradmin')}>
                <h5>Customers</h5>
                <h3>{users.length}</h3>
                <small>View All Users</small>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-warning text-dark rounded shadow-sm text-center" style={{ cursor: 'pointer' }} onClick={() => navigate('/getallselleradmin')}>
                <h5>Sellers</h5>
                <h3>{sellers.length}</h3>
                <small>View All Sellers</small>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-info text-white rounded shadow-sm text-center">
                <h6>Revenue</h6>
                <h4>$0000</h4>
                <small className="text-white">↓ 0.0% Last Month</small>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-secondary text-white rounded shadow-sm text-center">
                <h6>Expenses</h6>
                <h4>$0000</h4>
                <small className="text-white">↑ 0% Last Month</small>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: PROFIT + BAR CHART */}
        <div className="col-md-6">
          <div className="p-3 bg-white rounded shadow-sm mb-4">
            <h5>Costing &amp; Profit</h5>
            <div className="d-flex justify-content-between my-3">
              <div>
                <strong className="text-success">Profit</strong>
                <p>00% ↑ - 00k</p>
              </div>
              <div>
                <strong className="text-danger">Costing</strong>
                <p>00% ↓ - 00k</p>
              </div>
            </div>
            <div className="bg-light rounded text-center py-2 px-3">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barChartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Profit" fill="#28a745" />
                  <Bar dataKey="Costing" fill="#dc3545" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default DashBorad;
