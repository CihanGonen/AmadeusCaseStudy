import { useEffect, useState } from "react";
import PegasusLogo from "../assets/pegasus.png";
import ThyaoLogo from "../assets/thyao.png";

const FlightElem = ({ flight }) => {
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const takeOffHours = Number(flight.takeOff.split(":")[0]);
    const takeOffMinutes = Number(flight.takeOff.split(":")[1]);

    const landingHours = Number(flight.landing.split(":")[0]);
    const landingMinutes = Number(flight.landing.split(":")[1]);

    const takeOff = takeOffHours * 60 + takeOffMinutes;
    const landing = landingHours * 60 + landingMinutes;

    let timeDifferenceInMinutes;

    if (takeOff > landing) {
      timeDifferenceInMinutes = 24 * 60 - takeOff + landing;
    } else {
      timeDifferenceInMinutes = landing - takeOff;
    }

    const hoursDifference = Math.floor(timeDifferenceInMinutes / 60);
    const minutesDifference = timeDifferenceInMinutes % 60;

    setDuration(`${hoursDifference} h ${minutesDifference} min`);
  }, []);
  return (
    <div className="flight-elem">
      <div className="flight-elem-child company">
        <div className="logo">
          <img
            src={
              flight.company == "Turkish Airlines"
                ? ThyaoLogo
                : flight.company === "Pegasus"
                ? PegasusLogo
                : null
            }
            alt="company logo"
          />
        </div>
        <span>{flight.company}</span>
      </div>
      <div className="flight-elem-child duration-elem">
        <div className="from-side">
          <div className="takeoff">{flight.takeOff}</div>
          <div className="from-short">{flight.fromShort}</div>
        </div>
        <div className="duration-side">
          <div>{duration}</div>
          <div className="line"></div>
        </div>
        <div className="to-side">
          <div className="landing">{flight.landing}</div>
          <div className="to-short">{flight.toShort}</div>
        </div>
      </div>
      <div className="flight-elem-child price-elem">
        <div className="price">{flight.price}</div>
        <span>TRY</span>
      </div>
      <div className="flight-elem-child">
        <button>Select</button>
      </div>
    </div>
  );
};

export default FlightElem;
