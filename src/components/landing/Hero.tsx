import { motion } from "framer-motion";
import HeroButton from "./HeroButton";
import HeroTitle from "./HeroTitle";

interface HeroProps {
  onDemoClick: () => void;
}

const Hero = ({ onDemoClick }: HeroProps) => {
  return (
    <div className="container px-4 pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-3xl mx-auto text-center">
        <HeroTitle />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-xl text-muted-foreground"
        >
          Generate unique, profitable website ideas tailored to your goals and expertise.
          Our AI-powered platform helps you discover untapped opportunities in the digital space.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <HeroButton />
          <button
            onClick={onDemoClick}
            className="px-8 py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            View Demo
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;