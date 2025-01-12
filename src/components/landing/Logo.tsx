import React from 'react';

const Logo = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <img 
      src="/lovable-uploads/0e0d2d16-72d7-4f15-9be1-8056a3e3b441.png"
      alt="SaaSGen - Simplifying SaaS Solutions"
      title="SaaSGen Logo"
      className="w-12 h-12 cursor-pointer"
      onClick={scrollToTop}
    />
  );
};

export default Logo;