import React from "react";
import { Bell, LogOut } from "lucide-react";
import "./shared.css"

export function formatINR(n) {
    return "₹" + Number(n || 0).toLocaleString("en-IN");
}

// const statusClassMap = {
//     Active: "status-badge--active",
//     Completed: "status-badge--completed",
//     Approved: "status-badge--approved",
//     "Pending Approval": "status-badge--pending",
//     Rejected: "status-badge--rejected",
// };

export function StatusBadge({ status }) {
    // const modifier = statusClassMap[status] || "status-badge--completed";
    // return <span className={'status-badge ${modifier}'}>{status}</span>;
}

export function StatCard({ label, value, accent }) {
    return (
        <div className="stat-card">
            <p className="stat-card__label">{label}</p>
            <p className={`stat-card__value ${accent ? "stat-card__value--accent" : ""}`}>{value}</p>
        </div>
    );
}
export default function Sidebar({ items = [], active, onSelect, footerLabel, onLogout }) {
    return (
        <div className="sidebar">
            <div>
                <div className="sidebar__header">
                    <p className="sidebar__title">INFRS</p>
                    <p className="sidebar__subtitle">{footerLabel}</p>
                </div>
                <nav className="sidebar__nav">
                    {items.map((item) => (
                        <button key={item.key} onClick={() => onSelect(item.key)} className={`sidebar__item ${active === item.key ? "sidebar__item--active" : ""}`}>
                            <item.icon size={16} />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
            <button onClick={onLogout} className="sidebar__logout">
                <LogOut size={16} />Log Out
            </button>
        </div>
    );
}

export function TopBar({ title, subtitle }) {
    return (
        <div className="topbar">
            <div>
                <h1 className="topbar__title">{title}</h1>
                {subtitle && <p className="topbar__subtitle">{subtitle}</p>}
            </div>
            <div className="topbar__actions">
                <Bell size={18} color="#64748b" />
                <div className="topbar__avatar">{title[0]}</div>
            </div>
        </div>
    );
}