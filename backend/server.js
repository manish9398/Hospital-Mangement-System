require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

console.log("🔹 PORT from .env:", process.env.PORT);

mongoose
  .connect(process.env.MONGO_URI, { dbName: "hospitalDB" })
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

const hospitalSchema = new mongoose.Schema({
  name: String,
  city: String,
  image: String,
  rating: Number,
  description: String,
  images: [String],
  numberOfDoctors: Number,
  numberOfDepartments: Number,
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

app.get("/", (req, res) => {
  res.json({ msg: "Server Running" });
});

app.post("/api/v1/hospitals/create", async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json({ success: true, hospital });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/v1/hospitals", async (req, res) => {
  try {
    const { city } = req.query;
    const hospitals = await Hospital.find(city ? { city } : {});
    res.json({ success: true, hospitals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}); 

app.delete("/api/v1/hospitals/delete/:id", async (req, res) => {
  try {
    console.log("My req params: ", req.params);
    const { id } = req.params;
    await Hospital.findByIdAndDelete(id);
    res.json({ success: true, message: "Hospital deleted successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put("/api/v1/hospitals/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedHospital = await Hospital.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ success: true, hospital: updatedHospital });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/v1/hospitals/details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedHospital = await Hospital.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ success: true, hospital: updatedHospital });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
