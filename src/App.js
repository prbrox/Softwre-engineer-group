import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/databaseGUI/Dashboard";
import DatabaseControls from "./pages/databaseGUI/DatabaseControls";
import LayoutForm from "./pages/LayoutForm";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/databaseControls" element={<DatabaseControls />} />
        <Route path="/LayoutForm" element={<LayoutForm />} />
      </Routes>
    </>
  );
}

export default App;
