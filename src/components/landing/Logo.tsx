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
      {/* Abstract S shape made of intersecting lines */}
      <path
        d="M12 14C18 14 22 12 22 18C22 24 18 22 24 22C30 22 28 26 28 28"
        stroke="#000000e6"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M14 12C20 12 24 10 24 16C24 22 20 20 26 20C32 20 30 24 30 26"
        stroke="#9b87f5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Decorative elements */}
      <circle cx="20" cy="20" r="16" stroke="#6E59A5" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="12" stroke="#000000e6" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
};

export default Logo;