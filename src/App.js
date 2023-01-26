
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import DatabaseControls from './pages/DatabaseControls';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/databaseControls" element={<DatabaseControls />} />
      </Routes>
    </>
  );
}

export default App;
