import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";

import { useAirportsContext } from "./hooks/useAirportContext";
import { useEffect } from "react";

function App() {
  const { fetchAirports } = useAirportsContext();

  useEffect(() => {
    fetchAirports();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
