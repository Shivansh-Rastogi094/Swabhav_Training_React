import React, { useEffect, useState } from 'react';
import { readAllUsers } from '../services/UserService';
import { readAllProducts } from '../services/ProductService';
import { readAllClaims } from '../services/ClaimService';


const Dashboard = () => {
  const [users, setUsers] = useState(0);
  const [claims, setClaims] = useState(0);
  const [products, setProducts] = useState(0);

  const fetchDashboardData = async () => {
    try {
      // Running these in parallel makes your dashboard load much faster
      const [userRes, productRes, claimRes] = await Promise.all([
        readAllUsers(),
        readAllProducts(),
        readAllClaims()
      ]);

      setUsers(userRes.data.content.length);
      setProducts(productRes.data.content.length);
      setClaims(claimRes.data.content.length);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="header">
        <h2>Insurance Management</h2>
        <p>Overview of your current system metrics</p>
      </div>
      
      <div className="cards">
        <div className="card">
          <div className="card-header">
            <h4>Total Users</h4>
            <span className="card-icon" role="img" aria-label="users">👥</span>
          </div>
          <p className="card-value">{users}</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h4>Total Products</h4>
            <span className="card-icon" role="img" aria-label="products">📦</span>
          </div>
          <p className="card-value">{products}</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h4>Total Claims</h4>
            <span className="card-icon" role="img" aria-label="claims">📄</span>
          </div>
          <p className="card-value">{claims}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;