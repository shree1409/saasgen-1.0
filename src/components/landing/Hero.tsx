import { motion } from "framer-motion";
import HeroTitle from "./HeroTitle";
import HeroButton from "./HeroButton";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Hero = () => {
  const [idea, setIdea] = useState("");

  const handleGenerate = () => {
    // This would be connected to your idea generation logic
    setIdea("AI-powered SaaS analytics platform");
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2D1A3D] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute left-0 top-1/3 w-64 h-1 bg-gradient-to-r from-purple-500 to-transparent"
        />
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.2 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute right-0 top-1/2 w-96 h-1 bg-gradient-to-l from-pink-500 to-transparent"
        />
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.2 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          className="absolute left-0 top-2/3 w-80 h-1 bg-gradient-to-r from-purple-500 to-transparent"
        />
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
                className="w-full px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <Button 
              onClick={handleGenerate}
              size="lg"
              className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8"
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
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Generate Random Idea
          </motion.button>

          {idea && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-300"
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