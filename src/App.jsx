// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import UploadBusData from './components/UploadBusData';
import BusTimings from './components/BusTimings';
import AutoRickshaw from './components/AutoRickshaw';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload/data/bus" element={<UploadBusData />} />
          <Route path="/bus-timings" element={<BusTimings />} />
          <Route path="/auto-rickshaw" element={<AutoRickshaw />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
