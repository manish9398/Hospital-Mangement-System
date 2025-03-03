import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import { API } from "./api";



export default function Home() {
  const [hospitals, setHospitals] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      // const { data } = await axios.get("http://localhost:5001/api/v1/hospitals");
      const { data } = await API.get("/");
      setHospitals(data.hospitals);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };
  
  const searchByCity = async () => {
    try {
      //const { data } = await axios.get(`http://localhost:5001/api/v1/hospitals?city=${city}`);
      const { data } = await API.get(city ? `?city=${city}` : "")
      setHospitals(data.hospitals);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
        <input
          type="text"
          placeholder="Enter city name..."
          className="p-2 rounded-md text-black w-full sm:w-auto"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200"
          onClick={searchByCity}
        >
          Search
        </button>
        <Link to="/create" className="bg-green-500 px-4 py-2 rounded-md text-white">➕ Add Hospital</Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <div key={hospital._id} className="bg-white text-black p-5 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold">{hospital.name}</h2>
              <p className="text-gray-600">📍 {hospital.city}</p>
              <p className="text-yellow-500">⭐ {hospital.rating}/5</p>
              <Link to={`/hospital/${hospital._id}`} className="text-blue-600">View Details</Link>
            </div>
          ))
        ) : (
          <p className="text-center text-lg">No hospitals found.</p>
        )}
      </div>
    </div>
  );
}
