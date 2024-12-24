import { motion } from "framer-motion";
import GeneratorForm from "@/components/GeneratorForm";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <div className="container px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium bg-primary/5 text-primary px-3 py-1 rounded-full">
              Website Idea Generator
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Transform Your Vision into Reality
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate unique and actionable website ideas tailored to your goals and audience
          </p>
        </motion.div>

        <GeneratorForm />
      </div>
    </div>
  );
};

export default Index;