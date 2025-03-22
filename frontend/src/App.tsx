import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";

const App: React.FC = () => {
  return(
    <Router basename="/nest-forum">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App;
