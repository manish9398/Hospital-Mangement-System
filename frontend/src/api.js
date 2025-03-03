import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api/v1/hospitals",
});

// ✅ 1️⃣ Fetch Hospitals (Optional City Filter)
export const fetchHospitals = async (city) => {
  try {
    const response = await API.get(city ? `?city=${city}` : "");
    return response.data.hospitals;
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    throw error.response?.data || new Error("Failed to fetch hospitals.");
  }
};

// ✅ 2️⃣ Create a New Hospital
export const createHospital = async (hospitalData) => {
  try {
    const response = await API.post("/", hospitalData);
    return response.data;
  } catch (error) {
    console.error("Error creating hospital:", error);
    throw error.response?.data || new Error("Failed to create hospital.");
  }
};

// ✅ 3️⃣ Update Hospital
export const updateHospital = async (id, hospitalData) => {
  try {
    const response = await API.put(`/${id}`, hospitalData);
    return response.data;
  } catch (error) {
    console.error("Error updating hospital:", error);
    throw error.response?.data || new Error("Failed to update hospital.");
  }
};

// ✅ 4️⃣ Delete Hospital
export const deleteHospital = async (id) => {
  try {
    const response = await API.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting hospital:", error);
    throw error.response?.data || new Error("Failed to delete hospital.");
  }
};

// ✅ 5️⃣ Get Hospital Details
export const getHospitalDetails = async (id) => {
  try {
    const response = await API.get(`/${id}`);
    return response.data.hospital;
  } catch (error) {
    console.error("Error fetching hospital details:", error);
    throw error.response?.data || new Error("Failed to fetch hospital details.");
  }
};
