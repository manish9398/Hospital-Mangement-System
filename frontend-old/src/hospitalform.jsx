import { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "./api";

export default function HospitalForm() {
  const [hospital, setHospital] = useState({
    name: "",
    city: "",
    image: "",
    specialities: [],
    rating: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleSpecialityChange = (e) => {
    const selectedSpecialities = Array.from(e.target.selectedOptions, (option) => option.value);
    setHospital({ ...hospital, specialities: selectedSpecialities });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await axios.post("http://localhost:5001/api/v1/hospitals", hospital);
    await API.post("/", hospital);
    alert("Hospital added successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg text-black">
      <h2 className="text-2xl font-bold text-center">Add New Hospital</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Hospital Name" onChange={handleChange} required className="p-2 w-full border rounded"/>
        <input type="text" name="city" placeholder="City" onChange={handleChange} required className="p-2 w-full border rounded"/>
        <input type="text" name="image" placeholder="Image URL" onChange={handleChange} required className="p-2 w-full border rounded"/>
        <select multiple name="specialities" onChange={handleSpecialityChange} required className="p-2 w-full border rounded">
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Oncology">Oncology</option>
        </select>
        <input type="number" name="rating" placeholder="Rating (1-5)" onChange={handleChange} required className="p-2 w-full border rounded"/>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
}
