import { motion } from "framer-motion";
import HeroTitle from "./HeroTitle";
import HeroButton from "./HeroButton";

const Hero = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <HeroTitle />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
          >
            Generate unique website ideas tailored to your goals and preferences. Get detailed insights, technical recommendations, and monetization strategies.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4">
            <HeroButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;