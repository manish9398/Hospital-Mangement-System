import React, { useEffect, useState } from 'react';
import { getHospitalsByCity, deleteHospital } from './api';

const HospitalList = () => {
    const [city, setCity] = useState('');
    const [hospitals, setHospitals] = useState([]);

    const fetchHospitals = async () => {
        const response = await getHospitalsByCity(city);
        setHospitals(response.data);
    };

    useEffect(() => {
        if (city) fetchHospitals();
    }, [city]);

    return (
        <div>
            <input type="text" placeholder="Enter city" onChange={(e) => setCity(e.target.value)} />
            <button onClick={fetchHospitals}>Search</button>

            {hospitals.map((hospital) => (
                <div key={hospital._id}>
                    <h3>{hospital.name}</h3>
                    <p>{hospital.city}</p>
                    <img src={hospital.image} alt={hospital.name} width="100" />
                    <button onClick={() => deleteHospital(hospital._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default HospitalList;
