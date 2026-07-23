import React, { useState } from "react";
import {
  Shield,
  Lock,
  CheckCircle2,
  Globe,
  User,
  ShieldCheck,
  Building2,
  Phone,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";
import "../../Styles/login/Login.css";

const features = [
  { icon: Shield, label: "Bank-grade 256-bit encryption" },
  { icon: Lock, label: "Two-factor authentication (OTP)" },
  { icon: CheckCircle2, label: "SEBI registered & RBI compliant" },
  { icon: Globe, label: "Access from anywhere, anytime" },
];

const roles = [
  { id: "investor", icon: User, title: "Investor", desc: "Access your portfolio" },
  { id: "admin", icon: ShieldCheck, title: "Admin", desc: "Manage Investors" },
  { id: "superadmin", icon: Lock, title: "Super Admin", desc: "Full system access" },
  { id: "branchmanager", icon: Building2, title: "Branch Manager", desc: "Branch operations" },
];

export default function Login() {
  const [role, setRole] = useState("investor");
  const [investorId, setInvestorId] = useState("");
  const [mobile, setMobile] = useState("");

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-logo">
          <span className="auth-logo-badge">IN</span>
          <span className="auth-logo-text">INRFS</span>
        </div>

        <h1 className="auth-left-title">
          Secure Investor
          <br />
          Management Portal
        </h1>
        <p className="auth-left-subtitle">
          Access your investments, track returns, and manage your financial
          future from one unified platform.
        </p>

        <ul className="auth-feature-list">
          {features.map(({ icon: Icon, label }) => (
            <li key={label}>
              <span className="auth-feature-icon">
                <Icon size={16} />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <h2 className="auth-form-title">Welcome Back</h2>
          <p className="auth-form-subtitle">Sign in to your INRFS account</p>

          <div className="auth-field-label">Login As</div>
          <div className="role-grid">
            {roles.map(({ id, icon: Icon, title, desc }) => (
              <button
                type="button"
                key={id}
                className={`role-card${role === id ? " role-card-active" : ""}`}
                onClick={() => setRole(id)}
              >
                <span className="role-card-icon">
                  <Icon size={18} />
                </span>
                <span className="role-card-title">{title}</span>
                <span className="role-card-desc">{desc}</span>
              </button>
            ))}
          </div>

          <label className="auth-field-label" htmlFor="investorId">
            Investor ID
          </label>
          <div className="auth-input">
            <User size={16} className="auth-input-icon" />
            <input
              id="investorId"
              type="text"
              placeholder="Enter your Investor ID (e.g. INV001)"
              value={investorId}
              onChange={(e) => setInvestorId(e.target.value)}
            />
          </div>

          <label className="auth-field-label" htmlFor="mobile">
            Registered Mobile Number
          </label>
          <div className="auth-input">
            <Phone size={16} className="auth-input-icon" />
            <input
              id="mobile"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <button type="button" className="btn btn-primary btn-block">
            Send OTP <ArrowRight size={16} />
          </button>

          <div className="auth-divider" />

          <p className="auth-register-hint">
            New investor? <a href="/register">Register Now</a>
          </p>

          <a href="/" className="auth-back-link">
            <ChevronLeft size={15} /> Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}