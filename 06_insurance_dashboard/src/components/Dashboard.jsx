import React, { useEffect, useState } from 'react';
import { readAllUsers } from '../services/UserService';
import { readAllProducts } from '../services/ProductService';
import { readAllClaims } from '../services/ClaimService';
import { readAllPolicies } from '../services/PolicyService';
import { readAllPayments } from '../services/PaymentService';
import Card from './Card';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .dashboard-container {
    font-family: 'Inter', sans-serif;
    background: #F7F8FA;
    min-height: 100vh;
    padding: 32px 40px;
  }

  .header {
    margin-bottom: 32px;
  }

  .header h2 {
    font-size: 22px;
    font-weight: 700;
    color: #111827;
    letter-spacing: -0.3px;
  }

  .header p {
    font-size: 13.5px;
    color: #6B7280;
    margin-top: 4px;
    font-weight: 400;
  }

  .divider {
    height: 1px;
    background: #E4E7EC;
    margin-bottom: 28px;
  }

  .section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #9CA3AF;
    margin-bottom: 14px;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 16px;
  }

  .card {
    background: #FFFFFF;
    border: 1px solid #E4E7EC;
    border-radius: 12px;
    padding: 20px 22px 22px;
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.18s ease, transform 0.18s ease;
  }

  .card:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
    transform: translateY(-2px);
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    border-radius: 12px 12px 0 0;
  }

  .card.accent-blue::before  { background: #4F6EF7; }
  .card.accent-green::before { background: #16A34A; }
  .card.accent-amber::before { background: #D97706; }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .card-header h4 {
    font-size: 13px;
    font-weight: 500;
    color: #6B7280;
    line-height: 1.3;
  }

  .card-icon-wrap {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .card.accent-blue  .card-icon-wrap { background: #EEF1FE; }
  .card.accent-green .card-icon-wrap { background: #DCFCE7; }
  .card.accent-amber .card-icon-wrap { background: #FEF3C7; }

  .card-value {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    letter-spacing: -0.5px;
    line-height: 1;
  }

  .card-value.loading {
    background: #F3F4F6;
    border-radius: 6px;
    width: 70px;
    height: 28px;
    animation: shimmer 1.4s infinite;
  }

  @keyframes shimmer {
    0%   { opacity: 1; }
    50%  { opacity: 0.4; }
    100% { opacity: 1; }
  }

  .card-sub {
    font-size: 11.5px;
    color: #9CA3AF;
    margin-top: 6px;
    font-weight: 400;
  }

  @media (max-width: 600px) {
    .dashboard-container { padding: 20px 16px; }
    .cards { grid-template-columns: 1fr 1fr; gap: 12px; }
    .card-value { font-size: 22px; }
  }
`;
const Dashboard = () => {
  const [users, setUsers] = useState(0);
  const [claims, setClaims] = useState(0);
  const [products, setProducts] = useState(0);
  const [policies, setPolicies] = useState(0);
  const [payments, setPayments] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalClaims, setTotalClaims] = useState(0);

  const fetchDashboardData = async () => {
    try {
      const [userRes, productRes, claimRes, policyRes, paymentRes] = await Promise.all([
        readAllUsers(),
        readAllProducts(),
        readAllClaims(),
        readAllPolicies(),
        readAllPayments()
      ]);
      const payments = paymentRes.data.content.reduce(
              (sum, payment) => sum + payment.amount,
              0
              );

      const claims = claimRes.data.content.reduce(
              (sum, claim) => sum + claim.claimAmount,
              0
              );
              console.log(claimRes);

      setTotalPayments(payments);
      setTotalClaims(claims);
      setUsers(userRes.data.content.length);
      setProducts(productRes.data.content.length);
      setClaims(claimRes.data.content.length);
      setPolicies(policyRes.data.content.length);
      setPayments(paymentRes.data.content.length);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-container">
        <div className="header">
          <h2>Insurance Management</h2>
          <p>Overview of your current system metrics</p>
        </div>

        <div className="divider" />

        <p className="section-label">System Overview</p>
        <div className="cards">
          <Card title="Users" value={users} icon="👥" accent="accent-blue" sub="Registered accounts" />
          <Card title="Products" value={products} icon="📦" accent="accent-blue" sub="Active offerings" />
          <Card title="Policies" value={policies} icon="🗂️" accent="accent-blue" sub="Issued policies" />
          <Card title="Claims" value={claims} icon="📄" accent="accent-amber" sub="Filed claims" />
          <Card title="Payments" value={payments} icon="💵" accent="accent-blue" sub="Transactions logged" />
          <Card title="Total Claims Paid" value={totalClaims} icon="💸" accent="accent-amber" prefix="₹" sub="Cumulative claim amount" />
          <Card title="Total Payments Received" value={totalPayments} icon="✅" accent="accent-green" prefix="₹" sub="Cumulative premium collected" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;