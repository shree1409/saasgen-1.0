import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const HeroTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 text-center max-w-2xl relative z-10"
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
    </motion.div>
  );
};

export default HeroTitle;