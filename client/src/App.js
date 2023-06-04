import "./App.css";
import NavBar from "./components/navbar/navbar";
import Forcast from "./components/forcast/forcast";
import { Route, Routes } from "react-router-dom";
import HistoricalData from "./components/historicalData/historicalData";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Forcast />} />
          <Route path="/historicalData" element={<HistoricalData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
