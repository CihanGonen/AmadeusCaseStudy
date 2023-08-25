import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import List from "./pages/List";

const App = () => {
  return (
    <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
