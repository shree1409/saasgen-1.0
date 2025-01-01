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
      {/* Main bulb glass with more detailed lines */}
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
      
      {/* Additional decorative lines */}
      <path
        d="M15 15C15 19 17 21 20 23"
        stroke="#9b87f5"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M25 15C25 19 23 21 20 23"
        stroke="#9b87f5"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      
      {/* Inner glow details */}
      <path
        d="M20 8C16 8 13 12 13 17C13 20 15 22 17 24"
        stroke="#9b87f5"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M20 8C24 8 27 12 27 17C27 20 25 22 23 24"
        stroke="#9b87f5"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      
      {/* Enhanced bulb base */}
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
      
      {/* More dynamic light rays */}
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
      
      {/* Additional contrast rays */}
      <path
        d="M33 17H31"
        stroke="#000000e6"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M9 17H7"
        stroke="#000000e6"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.8"
      />
      
      {/* Extra decorative elements for more contrast */}
      <path
        d="M20 12C18 12 16 14 16 17"
        stroke="#9b87f5"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M20 12C22 12 24 14 24 17"
        stroke="#9b87f5"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
};

export default Logo;