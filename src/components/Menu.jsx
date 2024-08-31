import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="bg-green-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Country Explorer</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/search" className="hover:underline">Explore</Link>
          <Link to="/about" className="hover:underline">About</Link>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
