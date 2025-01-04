import { motion } from "framer-motion";

const HeroLightbulb = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-72 h-72 flex items-center justify-center"
    >
      {/* Outer glow effect */}
      <motion.div
        className="absolute w-48 h-48 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(155,135,245,0.2) 0%, rgba(155,135,245,0) 70%)",
          filter: "blur(20px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <svg
        width="200"
        height="200"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-transform duration-300 hover:scale-105 relative z-10"
      >
        {/* Main bulb outline */}
        <path
          d="M20 6C14 6 10 11 10 17C10 21 13 23 15 25C17 27 18 28 18 30V32H22V30C22 28 23 27 25 25C27 23 30 21 30 17C30 11 26 6 20 6Z"
          stroke="#403E43"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Enhanced bulb base */}
        <path
          d="M16 32H24"
          stroke="#403E43"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M17 34H23"
          stroke="#403E43"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* Animated light rays */}
        <motion.g
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <path
            d="M20 2V5"
            stroke="#9b87f5"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M29 8L26 11"
            stroke="#9b87f5"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M11 8L14 11"
            stroke="#9b87f5"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M33 17H31"
            stroke="#9b87f5"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <path
            d="M9 17H7"
            stroke="#9b87f5"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Glowing center */}
        <motion.circle
          cx="20"
          cy="17"
          r="4"
          fill="#9b87f5"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
};

export default HeroLightbulb;