import React, { useState } from 'react';
// import { createHospital } from './api'; // Assuming you have an API utility for making requests
import '../styles/form.css'
import { createHospital } from '../api/api';

const HospitalForm = () => {
  const [hospital, setHospital] = useState({
    name: '',
    city: '',
    image: '',
    specialities: [],
    rating: ''
  });

  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleSpecialityChange = (e) => {
    const options = e.target.options;
    const selectedSpecialities = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedSpecialities.push(options[i].value);
      }
    }
    setHospital({ ...hospital, specialities: selectedSpecialities });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createHospital(hospital); // Make the API call to create the hospital
    alert('Hospital added!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Hospital Name"
          value={hospital.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={hospital.city}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Image URL"
          value={hospital.image}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={hospital.rating}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="specialities">Specialities</label>
        <select
          name="specialities"
          multiple
          value={hospital.specialities}
          onChange={handleSpecialityChange}
          required
        >
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Oncology">Oncology</option>
          <option value="Gastroenterology">Gastroenterology</option>
        </select>
      </div>
      <div>
        <button type="submit">Create Hospital</button>
      </div>
    </form>
  );
};

export default HospitalForm;
