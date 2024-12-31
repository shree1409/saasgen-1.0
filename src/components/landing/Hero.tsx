import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GalleryHorizontal } from "lucide-react";

const Hero = () => {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Website Idea Generator
        </div>
        <h1 className="text-5xl font-bold leading-tight">
          Transform Your
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Vision
          </span>
          <br />
          into Reality
        </h1>
        <p className="text-xl text-muted-foreground">
          Generate unique and actionable website ideas tailored to your goals and audience
        </p>
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

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 mix-blend-overlay" />
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
            alt="Technology" 
            className="w-full h-full object-cover rounded-2xl relative animate-float"
          />
          <GalleryHorizontal className="absolute bottom-4 right-4 w-8 h-8 text-white/80" />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;