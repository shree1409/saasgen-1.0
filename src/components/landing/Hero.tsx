import { motion } from "framer-motion";
import HeroTitle from "./HeroTitle";
import HeroButton from "./HeroButton";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-24 max-w-5xl mx-auto relative overflow-hidden">
      {/* Purple light spreading effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(155,135,245,0.15) 0%, rgba(155,135,245,0) 70%)",
          filter: "blur(40px)",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Centered content */}
      <div className="flex flex-col items-center space-y-6">
        <HeroTitle />
        <HeroButton />
      </div>
    </div>
  );
};

export default Hero;