// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginForm from "./components/Auth/LoginForm";
import Dashboard from "./components/Pages/Dashboard";

import ProtectedRoute from "./middleware/ProtectedRoute";
import RoleRoute from "./middleware/RoleRoute";
import GuestRoute from "./middleware/GuestRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Login */}
        <Route path="/" element={
          <GuestRoute>
          <LoginForm />
          </GuestRoute>
          } />

        {/* ADMIN */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute role="admin">
                <Dashboard initialMenuId="dashboard" />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* KELURAHAN */}
        <Route
          path="/data-induk"
          element={
            <ProtectedRoute>
                <Dashboard initialMenuId="kib" />
            </ProtectedRoute>
          }
        />

        {/* REPORTS (bisa diakses dua role) */}
        <Route
          path="/laporan-kir"
          element={
            <ProtectedRoute>
              <Dashboard initialMenuId="reports" />
            </ProtectedRoute>
          }
        />

        {/* LABEL PRINT */}
        <Route
          path="/label"
          element={
            <ProtectedRoute>
              <Dashboard initialMenuId="print_labels" />
            </ProtectedRoute>
          }
        />
        {/* LABEL PRINT */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <Dashboard initialMenuId="user" />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
