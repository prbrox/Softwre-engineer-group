import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ReelsFlangeLayout from "./pages/Access/ReelsFlangeLayout";
import Dashboard from "./pages/databaseGUI/Dashboard";
import DatabaseControls from "./pages/databaseGUI/DatabaseControls";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/databaseControls" element={<DatabaseControls />} />
        <Route path="/flangeLayout" element={<ReelsFlangeLayout />} />
      </Routes>
    </>
  );
}

export default App;
