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
      {/* Main bulb glass - purple top */}
      <path
        d="M20 6C14 6 10 11 10 17C10 21 13 23 15 25"
        stroke="#9b87f5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 6C26 6 30 11 30 17C30 21 27 23 25 25"
        stroke="#9b87f5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Ridges on the bulb */}
      <path
        d="M13 14C16 15 24 15 27 14"
        stroke="#9b87f5"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M12 17C16 18 24 18 28 17"
        stroke="#9b87f5"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M13 20C16 21 24 21 27 20"
        stroke="#9b87f5"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.8"
      />
      
      {/* Black bottom part */}
      <path
        d="M15 25C17 27 18 28 18 30V32"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 25C23 27 22 28 22 30V32"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Coil in the middle */}
      <path
        d="M20 15C18 16 17 17 18 18C19 19 21 19 22 18C23 17 22 16 20 15"
        stroke="#000000"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Enhanced bulb base */}
      <path
        d="M16 32H24"
        stroke="#000000"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M17 34H23"
        stroke="#000000"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Light rays */}
      <path
        d="M20 2V5"
        stroke="#9b87f5"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M29 8L26 11"
        stroke="#9b87f5"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11 8L14 11"
        stroke="#9b87f5"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M33 17H31"
        stroke="#9b87f5"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M9 17H7"
        stroke="#9b87f5"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;