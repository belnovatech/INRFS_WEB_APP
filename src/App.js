import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import InvestorManagement from "./pages/admin/InvestorManagement";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              element={<AdminLayout breadcrumb={["Home", "Admin Portal"]} />}
            >
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route
                path="/admin/investors"
                element={<InvestorManagement />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;