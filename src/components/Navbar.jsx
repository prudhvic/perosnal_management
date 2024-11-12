import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg ${
      isActive 
        ? 'bg-blue-500 text-white' 
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow mb-4 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-l font-bold text-gray-900 dark:text-white">
            Personal Management Tool
          </h1>
          <div className="flex items-center space-x-4">
            <NavLink to="/" className={navLinkClass}>
              Todos
            </NavLink>
            <NavLink to="/notes" className={navLinkClass}>
              Notes
            </NavLink>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}