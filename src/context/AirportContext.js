import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AirportsContext = createContext();

export const AirportsContextProvider = ({ children }) => {
  const [airports, setAirports] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAirports = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:5000/airports");
    if (response.data) {
      let airportOptions = response.data.map((airport) => {
        return {
          value: airport.short,
          label: airport.value,
        };
      });
      setAirports(airportOptions);
      setLoading(false);
    }
  };

  return (
    <AirportsContext.Provider
      value={{ airports, fetchAirports, airportsLoading: loading }}
    >
      {children}
    </AirportsContext.Provider>
  );
};
