import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AirportsContextProvider } from "./context/AirportContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <AirportsContextProvider>
      <App />
    </AirportsContextProvider>
  </LocalizationProvider>
);
