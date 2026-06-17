import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar';
import { readMyPolicies } from '../services/PolicyService';
import Card from '../components/Card';
import { readMyClaims } from '../services/ClaimService';

const styles = `
  .dashboard-container {
    font-family: var(--font-body);
    background: var(--surface);
    min-height: 100vh;
    display: flex;
    position: relative;
  }

  .main-content {
    flex: 1;
    margin-left: 240px;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .topbar {
    height: 60px;
    background: var(--card);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .topbar-logo {
    font-size: 16px;
    font-weight: 700;
    color: var(--primary);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .topbar-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .role-badge {
    font-size: 12px;
    font-weight: 600;
    color: var(--primary-light);
    background: rgba(37, 99, 168, 0.1);
    padding: 4px 10px;
    border-radius: var(--radius-badge);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--primary);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    border: 2px solid var(--border);
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .user-avatar:hover {
    transform: scale(1.05);
  }

  .header {
    padding: 32px 40px 16px;
  }

  .header h2 {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.5px;
  }

  .header p {
    font-size: 14px;
    color: var(--text-secondary);
    margin-top: 4px;
  }

  .divider {
    height: 1px;
    background: var(--border);
    margin: 8px 40px 24px;
  }

  .section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-secondary);
    padding: 0 40px;
    margin-bottom: 16px;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    padding: 0 40px 40px;
  }

  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    padding: 24px;
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow-card);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 160px;
  }

  .card:hover {
    box-shadow: var(--shadow-premium);
    transform: translateY(-4px);
    border-color: rgba(37, 99, 168, 0.2);
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    border-radius: var(--radius-card) var(--radius-card) 0 0;
  }

  .card.accent-blue::before { background: var(--primary-light); }
  .card.accent-green::before { background: var(--success); }
  .card.accent-amber::before { background: var(--warning); }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .card-header h4 {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-secondary);
  }

  .card-icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    transition: transform 0.2s ease;
  }

  .card:hover .card-icon-wrap {
    transform: scale(1.1);
  }

  .card.accent-blue .card-icon-wrap { background: rgba(37, 99, 168, 0.1); color: var(--primary-light); }
  .card.accent-green .card-icon-wrap { background: rgba(22, 163, 74, 0.1); color: var(--success); }
  .card.accent-amber .card-icon-wrap { background: rgba(245, 158, 11, 0.1); color: var(--warning); }

  .card-value {
    font-size: 32px;
    font-weight: 700;
    color: var(--text-primary);
    font-family: var(--font-mono);
    letter-spacing: -0.5px;
    margin-top: auto;
  }

  .card-sub {
    font-size: 12px;
    color: var(--text-secondary);
    margin-top: 8px;
  }

  @media (max-width: 1024px) {
    .main-content {
      margin-left: 0;
    }
    .sidebar {
      display: none;
    }
  }
`;

const userLinks = [
    { label: "Dashboard", path: "/userdashboard" },
    { label: "Policies", path: "/admin/policies" },
    { label: "Claims", path: "/admin/claims" },
  ];

const UserDashboard = ({userData}) => {

    const [policy,setPolicy] = useState([])
    const [claims,setClaims] = useState([])

    const pendingClaims = claims.filter(
        claim => claim.claimStatus === "SUBMITTED"
    );

    const myPolicies = async()=>{
        const response = await readMyPolicies();
        setPolicy(response.content)
    }

    const myClaims = async()=>{
        const response = await readMyClaims();
        setClaims(response.content)
    }

    



    useEffect(()=>{
        myPolicies();
        myClaims();
    },[])


  return (
    <>
        <style>{styles}</style>
        <div className="dashboard-container">
            <Sidebar title="Admin Dashboard" links={userLinks} />
            <div className="main-content">
                <div className="topbar">
                    <div className="topbar-logo">🛡️ InsureSpace</div>
                    <div className="topbar-right">
                    <span className="role-badge">{userData?.fullName || "User"}</span>
                    <div className="user-avatar" title={ userData?.fullName || "User"}>
                        {(userData?.fullName || "User").split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2)}
                    </div>
                    </div>
                </div>
                <div className="header">
                    <h2>Good Morning, {userData?.fullName || "Admin"} 👋</h2>
                    <p>Overview of your current system metrics</p>
                </div>

                <div className="divider" />

                <p className="section-label">Current Account Overview</p>

                <div className="cards">
                    <Card title="My Policies" value={policy.length} icon="🗂️" accent="accent-blue" sub="Issued policies" />
                    <Card title="My Claims" value={claims.length} icon="📄" accent="accent-amber" sub="Filed claims" />
                    <Card title="Pending Claims" value={pendingClaims.length} icon="📄" accent="accent-amber" sub="Pending for Approval by " />
                </div>

            </div>
        </div>




    </>
  )
}

export default UserDashboard