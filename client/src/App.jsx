import React from 'react';
import Navbar from './components/NavBar';
import PhoneDetails from './pages/PhoneDetails';
import Home from './pages/Home';
import PhoneListPage from './pages/PhoneListPage';
import { Route, Routes, Navigate } from 'react-router-dom';



function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/phones/:phoneId" element={<PhoneDetails />} />
        <Route exact path="/phones/:phoneId" element={<PhoneDetailsPage />} />


      </Routes>
    </div>
  );
}




export default App;
