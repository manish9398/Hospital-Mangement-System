import React, { useState, useEffect } from "react";
import { fetchHospitals, deleteHospital } from "./api"; // Import API functions
import "./App.css";

function App() {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHospitals();
  }, []);

  const loadHospitals = async () => {
    try {
      setLoading(true);
      const data = await fetchHospitals();
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format from server.");
      }
      setHospitals(data);
    } catch (err) {
      setError("Failed to fetch hospitals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔴 Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hospital?"
    );
    if (!confirmDelete) return;

    const success = await deleteHospital(id);
    if (success) {
      setHospitals(hospitals.filter((hospital) => hospital._id !== id));
    } else {
      alert("Failed to delete hospital. Please try again.");
    }
  };

  // Filter hospitals based on search query
  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header">
        <h2>Hospital Management</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <p>Loading hospitals...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="hospital-list">
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((hospital) => (
              <div key={hospital._id} className="hospital-card">
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
                <h3>{hospital.name}</h3>
                <p>
                  <b>City:</b> {hospital.city}
                </p>
                <p>
                  <b>Specialties:</b> {hospital.specialties?.join(", ") || "N/A"}
                </p>
                <p>
                  <b>Contact:</b> {hospital.contact}
                </p>
                <p>
                  <b>Ratings:</b> {hospital.rating} ⭐
                </p>
                <button className="delete-btn" onClick={() => handleDelete(hospital._id)}>
                  🗑 Delete
                </button>
              </div>
            ))
          ) : (
            <p>No hospitals found for the entered city.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
