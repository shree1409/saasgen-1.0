import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/generator');
  };

  return (
    <div className="flex items-center justify-between mb-24 max-w-5xl mx-auto">
      {/* Left side with text */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 text-left max-w-2xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          SaaS Idea Generator
        </div>
        <h1 className="text-6xl font-bold leading-tight">
          Transform Your
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Vision
          </span>
          <br />
          into Reality
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl text-muted-foreground"
        >
          Generate unique and actionable SaaS ideas tailored to your goals and audience
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button 
            size="lg" 
            className="rounded-full text-white"
            onClick={handleGetStarted}
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Right side with animated lightbulb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-72 h-72 flex items-center justify-center"
      >
        <svg
          width="200"
          height="200"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform transition-transform duration-300 hover:scale-105"
        >
          {/* Main bulb outline */}
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
          
          {/* Black bottom part */}
          <path
            d="M15 25C17 27 18 28 18 30V32"
            stroke="#403E43"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25 25C23 27 22 28 22 30V32"
            stroke="#403E43"
            strokeWidth="2"
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
              stroke="#D6BCFA"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M29 8L26 11"
              stroke="#D6BCFA"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M11 8L14 11"
              stroke="#D6BCFA"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M33 17H31"
              stroke="#D6BCFA"
              strokeWidth="0.75"
              strokeLinecap="round"
            />
            <path
              d="M9 17H7"
              stroke="#D6BCFA"
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
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default Hero;