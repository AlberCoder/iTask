import React from 'react';

function Navbar() {
  return (
    <nav className="flex justify-between fixed top-0 w-full bg-indigo-900 text-white py-3 px-10 shadow-lg z-50">
      <div className="logo flex items-center">
        <img src="./src/components/TO DO LIST LOGO.svg" alt="Logo" className="w-11 h-11 mr-3" />
        <span className="font-bold text-2xl">iTask</span>
      </div>
      <ul className="flex gap-8">
        <li className="relative group cursor-pointer transition-all duration-300">
          <span className="hover:text-blue-300 transition-all duration-300">Home</span>
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="relative group cursor-pointer transition-all duration-300">
          <span className="hover:text-blue-300 transition-all duration-300">Your Tasks</span>
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
