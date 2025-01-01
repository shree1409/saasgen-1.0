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
      {/* Bulb glass - smoother curves */}
      <path
        d="M20 6C14 6 10 11 10 17C10 21 13 23 15 25C17 27 18 28 18 30V32"
        stroke="#9b87f5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 6C26 6 30 11 30 17C30 21 27 23 25 25C23 27 22 28 22 30V32"
        stroke="#9b87f5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Inner glow effect */}
      <path
        d="M20 8C16 8 13 12 13 17C13 20 15 22 17 24"
        stroke="#9b87f5"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      
      {/* Bulb base - more refined */}
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
      
      {/* Light rays - more dynamic */}
      <path
        d="M20 2V5"
        stroke="#000000e6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M29 8L26 11"
        stroke="#000000e6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11 8L14 11"
        stroke="#000000e6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Additional subtle rays */}
      <path
        d="M33 17H31"
        stroke="#000000e6"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M9 17H7"
        stroke="#000000e6"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
};

export default Logo;