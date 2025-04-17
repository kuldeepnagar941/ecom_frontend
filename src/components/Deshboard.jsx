import React, { useState } from 'react';


const DashBorad = () => {
   
    return (
        <div className="container py-4">
          <h4 className="fw-bold mb-4">Finx &gt; eCommerce</h4>
    
          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="p-3 bg-primary text-white rounded shadow-sm">
                <h5>Wallet</h5>
                <h3>$00.00</h3>
                <small className="text-white-50">↑ 00% Last Month</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-danger text-white rounded shadow-sm">
                <h5>New Product</h5>
                <h3>00.00k</h3>
                <small className="text-white-50">↓ 0.0% Last Month</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-white rounded shadow-sm text-center">
                <h6>Customers</h6>
                <h4>00k</h4>
                <small className="text-success">↑ 25% Last Month</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-white rounded shadow-sm text-center">
                <h6>Order</h6>
                <h4>00k</h4>
                <small className="text-danger">↓ 00.0% Last Month</small>
              </div>
            </div>
          </div>
    
          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="p-3 bg-white rounded shadow-sm text-center">
                <h6>Revenue</h6>
                <h4>$0000</h4>
                <small className="text-danger">↓ 0.0% Last Month</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-white rounded shadow-sm text-center">
                <h6>Expenses</h6>
                <h4>$0000</h4>
                <small className="text-success">↑ 0% Last Month</small>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-white rounded shadow-sm">
                <h6>Costing &amp; Profit</h6>
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
                <div className="bg-light rounded text-center py-5 text-muted">
                  [Cost &amp; Profit Chart Placeholder]
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default DashBorad