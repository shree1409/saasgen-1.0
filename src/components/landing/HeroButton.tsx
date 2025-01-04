import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroButton = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/generator');
  };

  return (
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
  );
};

export default HeroButton;