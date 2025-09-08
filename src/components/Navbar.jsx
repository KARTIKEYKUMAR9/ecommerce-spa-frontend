import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <Link to="/listing" className="text-2xl font-bold text-primary">
          E-Shop
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-800 font-medium">{user.name}</span>
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 bg-primary text-white rounded hover:bg-blue-800"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 bg-secondary text-white rounded hover:bg-green-700"
              >
                Signup
              </Link>
            </>
          )}
          <Link to="/cart" className="relative">
            <ShoppingCartIcon className="w-6 h-6 text-gray-800" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
