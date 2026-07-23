import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./shared/Shared";
import HomePage from "./pages/HomePage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;