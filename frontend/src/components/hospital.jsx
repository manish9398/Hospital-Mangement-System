import React, { useState } from "react";
// import axios from "axios";
import { API } from "../api/api";

function CreateHospital() {
  const [hospital, setHospital] = useState({
    name: "",
    city: "",
    image: "",
    rating: "",
  });

  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.post("http://localhost:5001/api/v1/hospitals/create", hospital);
      await API.post("/create", hospital);
      alert("Hospital Added!");
      setHospital({ name: "", city: "", image: "", rating: "" }); // Clear form
    } catch (error) {
      console.error("Error creating hospital:", error);
      alert("Failed to add hospital.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={hospital.name} onChange={handleChange} required />
      <input type="text" name="city" placeholder="City" value={hospital.city} onChange={handleChange} required />
      <input type="text" name="image" placeholder="Image URL" value={hospital.image} onChange={handleChange} required />
      <input type="number" name="rating" placeholder="Rating" value={hospital.rating} onChange={handleChange} required />
      <button type="submit">Create Hospital</button>
    </form>
  );
}

export default CreateHospital;
