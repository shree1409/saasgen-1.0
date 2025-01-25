import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroContentProps {
  idea: string;
  onGenerate: () => void;
}

const HeroContent = ({ idea, onGenerate }: HeroContentProps) => {
  return (
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
          onClick={onGenerate}
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
        onClick={onGenerate}
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
  );
};

export default HeroContent;