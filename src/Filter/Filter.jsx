import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FilterStyle.css";

const Filter = ({ carItems }) => {
  const [selectModel, setSelectedModel] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  let years = [];
  for (let i = 2014; i <= 2024; i++) {
    years.push(i);
  }

  useEffect(() => {
    if (selectModel && selectYear) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [selectYear, selectModel]);

  function modelChange(e) {
    const value = e.target.value;
    setSelectedModel(value);
  }

  function yearChange(e) {
    const value = e.target.value;
    setSelectYear(value);
  }

  function handleSubmit() {
    if (selectModel && selectYear) {
      const selectedCar = carItems.find((car) => car.name === selectModel);
      console.log(carItems);

      console.log("Navigating to:", `/result/${selectedCar.id}/${selectYear}`);
      if (selectedCar) {
        navigate(`/result/${selectedCar.id}/${selectYear}`);
      }
    }
  }

  return (
    <div className="filter-section">
      <div className="select-item">
        <label htmlFor="year-select" className="select-label">
          Select Year:
        </label>
        <select id="year-select" onChange={yearChange} className="select-field">
          <option value="">Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="select-item">
        <label htmlFor="model-select" className="select-label">
          Select model:
        </label>
        <select
          id="model-select"
          onChange={modelChange}
          className="select-field"
        >
          <option value="">Models</option>
          {carItems.map((car) => (
            <option key={car.id} value={car.name}>
              {car.name}
            </option>
          ))}
        </select>
      </div>
      {show === true ? <button onClick={handleSubmit}>Next</button> : <></>}
    </div>
  );
};

export default Filter;
