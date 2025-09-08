import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Listing from './pages/Listing';
import Cart from './pages/Cart';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Listing />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
