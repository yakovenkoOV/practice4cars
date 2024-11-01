import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResultStyle.css";

const Result = () => {
  const { makeId, year } = useParams();
  const [carList, setCarList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
        );
        const list = response.data.Results.map((item) => ({
          Make_ID: item.Make_ID,
          Make_Name: item.Make_Name,
          Model_ID: item.Model_ID,
          Model_Name: item.Model_Name,
        }));
        setCarList(list);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  console.log(carList);
  return (
    <div className="App">
      <h1>Vehicle Details</h1>
      <button onClick={() => navigate(`/`)}>Back</button>
      <div className="car-items">
        {carList.map((car) => (
          <div className="car-item" key={car.Model_ID}>
            <p>Car name: {car.Make_Name}</p>
            <p>Car model: {car.Model_Name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
