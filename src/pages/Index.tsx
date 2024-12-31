import { motion } from "framer-motion";
import GeneratorForm from "@/components/GeneratorForm";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Benefits from "@/components/landing/Benefits";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Header />
      
      <div className="container px-4 py-12">
        <Hero />
        <Benefits />

        {/* Generator Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-panel rounded-2xl p-8 mb-24"
          id="generator"
        >
          <GeneratorForm />
        </motion.div>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center py-16 px-4 glass-panel rounded-2xl bg-gradient-to-r from-purple-600/10 to-blue-500/10"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Create Something Amazing?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start generating your perfect website idea now and turn your vision into reality
          </p>
          <Button 
            size="lg" 
            className="rounded-full text-white"
            onClick={() => {
              const element = document.getElementById('generator');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Generate Your Idea
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.section>
      </div>
    </div>
  );
};

export default Index;