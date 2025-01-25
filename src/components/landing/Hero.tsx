import { useState } from "react";
import FuturisticGraphic from "./FuturisticGraphic";
import HeroBackground from "./hero/HeroBackground";
import HeroContent from "./hero/HeroContent";

const Hero = () => {
  const [idea, setIdea] = useState("");

  const handleGenerate = () => {
    setIdea("AI-powered SaaS analytics platform");
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2D1A3D] overflow-hidden">
      <FuturisticGraphic />
      <HeroBackground />
      
      <div className="container relative px-4 md:px-6 pt-32 pb-20">
        <HeroContent idea={idea} onGenerate={handleGenerate} />
      </div>
    </section>
  );
};

export default Hero;