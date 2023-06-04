import "./App.css";
import NavBar from "./components/navbar/navbar";
import Forcast from "./components/forcast/forcast";
import { Route, Routes } from "react-router-dom";
import HistoricalData from "./components/historicalData/historicalData";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<Forcast />} />
        <Route path="/historicalData" element={<HistoricalData />} />
      </Routes>
    </div>
  );
}

export default App;
