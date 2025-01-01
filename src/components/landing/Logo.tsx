import React from 'react';

const Logo = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transform transition-transform duration-300 hover:scale-105"
    >
      {/* Bulb glass */}
      <path
        d="M20 8C15 8 11 12 11 17C11 20 13 22 15 24C17 26 18 27 18 29V32"
        stroke="#9b87f5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M20 8C25 8 29 12 29 17C29 20 27 22 25 24C23 26 22 27 22 29V32"
        stroke="#9b87f5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Bulb base */}
      <path
        d="M16 32H24"
        stroke="#000000e6"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M17 34H23"
        stroke="#000000e6"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Light rays */}
      <path
        d="M20 4V6"
        stroke="#000000e6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M28 7L26 9"
        stroke="#000000e6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 7L14 9"
        stroke="#000000e6"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;