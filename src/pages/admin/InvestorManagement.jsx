import React, { useState } from "react";
import { Download, Plus, Search, Eye, Pencil, Trash2 } from "lucide-react";
import "../../Styles/Admin/InvestorManagement.css";

const investors = [
  { id: "INV001", name: "Arjun Sharma", email: "arjun@email.com", mobile: "9876543210", branch: "Mumbai HQ", registered: "12 Jan 2025", kyc: "Approved", status: "Active", investment: "₹5,00,000" },
  { id: "INV002", name: "Priya Patel", email: "priya@email.com", mobile: "9876543211", branch: "Delhi North", registered: "14 Jan 2025", kyc: "Pending", status: "Pending", investment: "₹2,50,000" },
  { id: "INV003", name: "Rahul Kumar", email: "rahul@email.com", mobile: "9876543212", branch: "Bangalore", registered: "16 Jan 2025", kyc: "Approved", status: "Active", investment: "₹8,75,000" },
  { id: "INV004", name: "Sunita Verma", email: "sunita@email.com", mobile: "9876543213", branch: "Chennai", registered: "18 Jan 2025", kyc: "Rejected", status: "Suspended", investment: "₹1,50,000" },
  { id: "INV005", name: "Vikram Singh", email: "vikram@email.com", mobile: "9876543214", branch: "Pune", registered: "20 Jan 2025", kyc: "Pending", status: "Pending", investment: "₹3,25,000" },
  { id: "INV006", name: "Neha Gupta", email: "neha@email.com", mobile: "9876543215", branch: "Mumbai HQ", registered: "22 Jan 2025", kyc: "Approved", status: "Active", investment: "₹6,00,000" },
];

function initials(name) {
  return name.charAt(0);
}

export default function InvestorManagement() {
  const [selected, setSelected] = useState([]);

  const toggleAll = (e) => {
    setSelected(e.target.checked ? investors.map((i) => i.id) : []);
  };

  const toggleOne = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      <div className="im-header">
        <div>
          <h1>Investor Management</h1>
          <p>Manage all registered investors, KYC status, and account access</p>
        </div>
        <div className="im-header-actions">
          <button className="btn btn-outline">
            <Download size={15} /> Export
          </button>
          <button className="btn btn-primary">
            <Plus size={15} /> Add Investor
          </button>
        </div>
      </div>

      <div className="im-toolbar">
        <div className="im-search">
          <Search size={15} />
          <input type="text" placeholder="Search by name, ID, mobile..." />
        </div>
        <select className="im-select">
          <option>All Branches</option>
          <option>Mumbai HQ</option>
          <option>Delhi North</option>
          <option>Bangalore</option>
          <option>Chennai</option>
          <option>Pune</option>
        </select>
        <select className="im-select">
          <option>All KYC Status</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>
        <button className="btn btn-bulk">Bulk Approve</button>
      </div>

      <div className="im-table-wrap">
        <table className="im-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={toggleAll}
                  checked={selected.length === investors.length}
                />
              </th>
              <th>INVESTOR ID</th>
              <th>INVESTOR NAME</th>
              <th>MOBILE</th>
              <th>BRANCH</th>
              <th>REGISTERED</th>
              <th>KYC</th>
              <th>STATUS</th>
              <th>INVESTMENT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {investors.map((inv) => (
              <tr key={inv.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(inv.id)}
                    onChange={() => toggleOne(inv.id)}
                  />
                </td>
                <td>
                  <span className="im-id">{inv.id}</span>
                </td>
                <td>
                  <div className="im-investor-cell">
                    <span className="im-avatar">{initials(inv.name)}</span>
                    <div>
                      <div className="im-name">{inv.name}</div>
                      <div className="im-email">{inv.email}</div>
                    </div>
                  </div>
                </td>
                <td>{inv.mobile}</td>
                <td className="im-branch">{inv.branch}</td>
                <td className="im-muted">{inv.registered}</td>
                <td>
                  <span className={`im-badge im-badge-${inv.kyc.toLowerCase()}`}>{inv.kyc}</span>
                </td>
                <td>
                  <span className={`im-badge im-badge-${inv.status.toLowerCase()}`}>{inv.status}</span>
                </td>
                <td className="im-investment">{inv.investment}</td>
                <td>
                  <div className="im-actions">
                    {inv.status === "Pending" && (
                      <>
                        <button className="im-btn im-btn-approve">Approve</button>
                        <button className="im-btn im-btn-reject">Reject</button>
                      </>
                    )}
                    <button className="im-icon-btn">
                      <Eye size={14} />
                    </button>
                    <button className="im-icon-btn">
                      <Pencil size={14} />
                    </button>
                    <button className="im-icon-btn im-icon-btn-danger">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="im-pagination">
        <span>Showing 1-{investors.length} of {investors.length} records</span>
        <div className="im-pagination-controls">
          <button className="im-page-btn" disabled>‹</button>
          <button className="im-page-btn im-page-btn-active">1</button>
          <button className="im-page-btn" disabled>›</button>
        </div>
      </div>
    </>
  );
}