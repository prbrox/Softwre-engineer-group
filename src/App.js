
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import DatabaseControls from './pages/DatabaseControls';
import LayoutForm from "./pages/LayoutForm"


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/databaseControls" element={<DatabaseControls />} />
        <Route path = "/LayoutForm" element ={<LayoutForm />} />
      </Routes>
    </>
  );
}

export default App;
