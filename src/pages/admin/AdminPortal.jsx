import React, { useState } from "react";
import {
  LayoutDashboard, Users, ClipboardList, BarChart3,
  CheckCircle2, XCircle,
} from "lucide-react";
import { Sidebar, TopBar, StatCard, StatusBadge, formatINR } from "../shared/Shared";
import "./admin.css";

const adminInvestors = [
  { investorId: "INV0042", name: "Rahul Kumar", mobile: "9876543210", status: "Approved", investments: 3 },
  { investorId: "INV0043", name: "Sneha Reddy", mobile: "9876501234", status: "Pending Approval", investments: 0 },
  { investorId: "INV0044", name: "Arjun Mehta", mobile: "9876512345", status: "Approved", investments: 1 },
  { investorId: "INV0045", name: "Kavya Nair", mobile: "9876523456", status: "Rejected", investments: 0 },
];

const investorInvestments = [
  { bondNumber: "TXN8456123", amount: 500000, rate: 12, tenure: 12, investedOn: "2026-03-15", maturity: "2027-03-15", status: "Active" },
  { bondNumber: "TXN8123998", amount: 250000, rate: 10.5, tenure: 6, investedOn: "2026-05-01", maturity: "2026-11-01", status: "Active" },
  { bondNumber: "TXN8009331", amount: 100000, rate: 11, tenure: 3, investedOn: "2026-01-10", maturity: "2026-04-10", status: "Completed" },
];

const adminInvestmentsPendingVerification = [
  { txnId: "TXN9001122", investor: "Sneha Reddy", amount: 300000, submittedOn: "2026-07-20" },
];

export function AdminLogin({ onLoggedIn, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <button onClick={onBack} className="admin-login__back">&larr; Back</button>
        <h2 className="admin-login__title">Admin login</h2>
        <p className="admin-login__subtitle">Sign in to manage investors, investments, and settlements.</p>

        <div className="admin-login__field">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@inrfs.com" />
        </div>
        <div className="admin-login__field">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <button onClick={() => onLoggedIn()} className="admin-btn">Sign in</button>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const pendingApprovals = adminInvestors.filter((i) => i.status === "Pending Approval").length;
  const totalInvested = investorInvestments.reduce((s, i) => s + i.amount, 0);
  return (
    <div>
      <TopBar title="Admin dashboard" />
      <div className="admin-page">
        <div className="admin-stats-grid">
          <StatCard label="Total investors" value={adminInvestors.length} />
          <StatCard label="Pending approvals" value={pendingApprovals} accent />
          <StatCard label="Active investments" value={investorInvestments.filter((i) => i.status === "Active").length} />
          <StatCard label="Total investment amount" value={formatINR(totalInvested)} />
        </div>
        <div className="admin-section">
          <p className="admin-section__title">Payments awaiting verification</p>
          <div className="admin-list-card">
            {adminInvestmentsPendingVerification.map((p) => (
              <div key={p.txnId} className="admin-list-row">
                <div>
                  <p className="admin-list-row__name">{p.investor}</p>
                  <p className="admin-list-row__meta">{p.txnId} &middot; submitted {p.submittedOn}</p>
                </div>
                <div className="admin-list-row__right">
                  <span className="mono">{formatINR(p.amount)}</span>
                  <button className="admin-btn admin-btn--pill">Verify &amp; generate bond</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminInvestors() {
  return (
    <div>
      <TopBar title="Investor management" />
      <div className="admin-page">
        <table className="data-table">
          <thead>
            <tr>
              <th>Investor ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Investments</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {adminInvestors.map((inv) => (
              <tr key={inv.investorId}>
                <td className="mono">{inv.investorId}</td>
                <td>{inv.name}</td>
                <td className="mono">{inv.mobile}</td>
                <td>{inv.investments}</td>
                <td><StatusBadge status={inv.status} /></td>
                <td>
                  {inv.status === "Pending Approval" ? (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="admin-action-approve"><CheckCircle2 size={14} />Approve</button>
                      <button className="admin-action-reject"><XCircle size={14} />Reject</button>
                    </div>
                  ) : (
                    <span className="admin-action-muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function AdminInvestments() {
  return (
    <div>
      <TopBar title="Investment management" />
      <div className="admin-page">
        <table className="data-table">
          <thead>
            <tr>
              <th>Bond number</th>
              <th>Amount</th>
              <th>Rate</th>
              <th>Maturity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {investorInvestments.map((inv) => (
              <tr key={inv.bondNumber}>
                <td className="mono">{inv.bondNumber}</td>
                <td className="mono">{formatINR(inv.amount)}</td>
                <td className="mono">{inv.rate}%</td>
                <td>{inv.maturity}</td>
                <td><StatusBadge status={inv.status} /></td>
                <td className="admin-table-actions">
                  <button>Extend tenure</button>
                  <button>Early payout</button>
                  <button>Settle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function AdminReports() {
  const reports = ["Investor report", "Investment report", "Monthly interest report", "Settlement report", "Active investment report"];
  return (
    <div>
      <TopBar title="Reports" />
      <div className="admin-page">
        <div className="admin-reports-grid">
          {reports.map((r) => (
            <div key={r} className="admin-report-card">
              <span className="admin-report-card__name">{r}</span>
              <div className="admin-report-card__actions">
                <button>PDF</button>
                <button>Excel</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdminPortal({ onLogout }) {
  const [page, setPage] = useState("dashboard");
  const items = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "investors", label: "Investors", icon: Users },
    { key: "investments", label: "Investments", icon: ClipboardList },
    { key: "reports", label: "Reports", icon: BarChart3 },
  ];
  return (
    <div className="admin-shell">
      <Sidebar items={items} active={page} onSelect={setPage} footerLabel="Admin" onLogout={onLogout} />
      <div className="admin-shell__main">
        {page === "dashboard" && <AdminDashboard />}
        {page === "investors" && <AdminInvestors />}
        {page === "investments" && <AdminInvestments />}
        {page === "reports" && <AdminReports />}
      </div>
    </div>
  );
}