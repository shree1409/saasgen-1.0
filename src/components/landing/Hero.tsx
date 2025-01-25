import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Hero = () => {
  const [idea, setIdea] = useState("");

  const handleGenerate = () => {
    setIdea("AI-powered SaaS analytics platform");
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2D1A3D] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl"
        />

        {/* Animated lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: -100, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: [0.1, 0.3, 0.1],
              y: [0, 10, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute left-0 w-[200px] h-[1px] bg-gradient-to-r from-purple-500/30 to-transparent`}
            style={{
              top: `${20 + (i * 15)}%`,
            }}
          />
        ))}

        {/* Animated dots */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container relative px-4 md:px-6 pt-32 pb-20">
        <div className="flex flex-col items-center space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Create Your Perfect
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                SaaS Landing Page
              </span>
              <br />
              with AI
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Input your SaaS idea or get inspired. SaasGen will generate a stunning landing page in seconds.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-2xl flex flex-col md:flex-row gap-4 items-center justify-center"
          >
            <div className="relative w-full md:w-3/4">
              <input
                type="text"
                placeholder="Machine learning recipe generator"
                className="w-full px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <motion.div
                className="absolute inset-0 -z-10 rounded-lg opacity-50"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(168, 85, 247, 0.4)",
                    "0 0 0 10px rgba(168, 85, 247, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </div>
            <Button 
              onClick={handleGenerate}
              size="lg"
              className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 transition-all duration-300 hover:scale-105"
            >
              Generate
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={handleGenerate}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            Generate Random Idea
          </motion.button>

          {idea && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-300 bg-white/5 px-6 py-3 rounded-lg border border-white/10"
            >
              Generated Idea: {idea}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;