import { useEffect, useState } from "react";
import axios from "axios";

import Select from "react-select";
import { DatePicker } from "@mui/x-date-pickers";
import { BiSolidPlaneAlt } from "react-icons/bi";
import dayjs from "dayjs";

const options = [
  { value: "chocolate", label: "Trabzon" },
  { value: "strawberry", label: "Rize" },
  { value: "vanilla", label: "Kayseri" },
];

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [airports, setAirports] = useState(null);
  const [airportsFrom, setAirportsFrom] = useState(null);
  const [airportsTo, setAirportsTo] = useState(null);

  const [airportTo, setAirportTo] = useState("");
  const [airportFrom, setAirportFrom] = useState("");
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(null);
  const [isOneWay, setIsOneWay] = useState(false);

  const today = dayjs();

  useEffect(() => {
    const getAirports = async () => {
      let response;
      try {
        response = await axios.get(
          "https://64e8a16899cf45b15fdfe430.mockapi.io/api/v1/airports"
        );
        if (response.data) {
          console.log(response.data[0].airports);
          let airportOptions = response.data[0].airports.map((airport) => {
            return {
              value: airport,
              label: airport,
            };
          });
          setAirports(airportOptions);
          setAirportsFrom(airportOptions);
          setAirportsTo(airportOptions);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    setLoading(true);
    getAirports();
  }, []);

  useEffect(() => {
    // changing airports array so user cant choose same
    if (airportTo) {
      setAirportsFrom(
        airports.filter((airport) => airport.label !== airportTo)
      );
    } else {
      setAirportsFrom(airports);
    }
    if (airportFrom) {
      setAirportsTo(
        airports.filter((airport) => airport.label !== airportFrom)
      );
    } else {
      setAirportsTo(airports);
    }
  }, [airportFrom, airportTo]);

  return (
    <div className="home-wrapper">
      <div className="form-wrapper">
        <div className="form-child">
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "#F0F1F5",
                color: "black",
                border: "none",
              }),
            }}
            placeholder={
              <div className="select-placeholder">
                <BiSolidPlaneAlt /> From ?
              </div>
            }
            onChange={(value) => setAirportFrom(value.label)}
            options={airportsFrom}
          />
        </div>
        <div className="form-child">
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "#F0F1F5",
                color: "black",
                border: "none",
              }),
            }}
            placeholder={
              <div className="select-placeholder">
                <BiSolidPlaneAlt /> To ?
              </div>
            }
            onChange={(value) => setAirportTo(value.label)}
            options={airportsTo}
          />
        </div>
        <div className="form-child">
          <DatePicker
            label="Departure Date"
            minDate={today}
            value={departureDate}
            onChange={(value) => setDepartureDate(value)}
            slotProps={{ textField: { size: "small" } }}
          />
        </div>
        <div className="form-child">
          <DatePicker
            label="Return Date"
            minDate={departureDate}
            value={returnDate}
            disabled={isOneWay}
            onChange={(value) => setReturnDate(value)}
            slotProps={{ textField: { size: "small" } }}
          />
        </div>

        <div className="form-child">
          <div className="radios-wrapper">
            <div className="radio-wrapper">
              <input
                type="radio"
                id="round"
                name="trip-type"
                value="Round Trip"
                checked={!isOneWay}
                onChange={() => setIsOneWay(false)}
              />
              <label htmlFor="round">Round Trip</label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                id="one-way"
                name="trip-type"
                value="One Way"
                checked={isOneWay}
                onChange={() => setIsOneWay(true)}
              />
              <label htmlFor="one-way">One Way</label>
            </div>
          </div>
        </div>
        <div className="form-child"></div>
        <div className="form-child"></div>
        <div className="form-child">
          <button>Search Flights</button>
        </div>
        {/* 

        */}
      </div>
    </div>
  );
};

export default Home;
