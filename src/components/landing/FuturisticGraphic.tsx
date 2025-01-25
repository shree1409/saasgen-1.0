import { motion } from "framer-motion";

export default function FuturisticGraphic() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(147, 51, 234, 0.1)" />
            <stop offset="50%" stopColor="rgba(236, 72, 153, 0.1)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
          </linearGradient>
        </defs>

        {/* Animated grid lines */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          {[...Array(10)].map((_, i) => (
            <line
              key={`horizontal-${i}`}
              x1="0"
              y1={i * 10}
              x2="100"
              y2={i * 10}
              stroke="url(#grid-gradient)"
              strokeWidth="0.1"
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <line
              key={`vertical-${i}`}
              x1={i * 10}
              y1="0"
              x2={i * 10}
              y2="100"
              stroke="url(#grid-gradient)"
              strokeWidth="0.1"
            />
          ))}
        </motion.g>

        {/* Animated circles */}
        <motion.circle
          cx="20"
          cy="30"
          r="5"
          fill="rgba(147, 51, 234, 0.2)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.circle
          cx="80"
          cy="70"
          r="3"
          fill="rgba(236, 72, 153, 0.2)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Animated lines */}
        <motion.path
          d="M10,90 Q30,60 50,80 T90,40"
          stroke="rgba(59, 130, 246, 0.2)"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}