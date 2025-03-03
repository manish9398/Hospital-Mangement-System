import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HospitalForm from "./hosform"; // Ensure hosform.js is in the correct location
import "./App.css"; // Import global styles if needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HospitalForm />} />
      </Routes>
    </Router>
  );
}

export default App;
