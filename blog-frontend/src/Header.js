import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-700 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          {/* Logo */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/2922/2922506.png" // Blog icon from Flaticon
            alt="Blog Logo"
            className="w-12 h-12 mr-3"
          />

          <h1 className="text-3xl font-semibold tracking-tight">
            <Link to="/">My Blog</Link>
          </h1>
        </div>
        <nav>
          <Link to="/" className="mx-2 text-lg hover:text-blue-300">
            Home
          </Link>
          <Link to="/create" className="mx-2 text-lg hover:text-blue-300">
            Create Post
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
