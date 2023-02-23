import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/databaseGUI/Dashboard";
import DatabaseControls from "./pages/databaseGUI/DatabaseControls";
import Hazardous from "./pages/hazardous/HazardousConditions";
import Reports from "./pages/hazardous/Reports";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/Hazardous" element={<Hazardous />} />
        <Route path="/databaseControls" element={<DatabaseControls />} />
      </Routes>
    </>
  );
}

export default App;
