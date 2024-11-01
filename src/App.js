import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Filter from "./Filter/Filter";

function App() {
  const [carItems, setCarItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
        );
        const list = response.data.Results.map((item) => ({
          name: item.MakeName,
          id: item.MakeId,
        }));
        setCarItems(list);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Filter Page</h1>
      <Filter carItems={carItems}></Filter>
    </div>
  );
}

export default App;
