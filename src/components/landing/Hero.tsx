import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mb-24 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Website Idea Generator
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
          Generate unique and actionable website ideas tailored to your goals and audience
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button 
            size="lg" 
            className="rounded-full text-white"
            onClick={() => {
              const element = document.getElementById('generator');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Start Generating
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;