import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Create Your Perfect SaaS?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied users and transform your SaaS idea into a
          stunning reality with SaasGen.
        </p>
        <Link
          to="/sign-up"
          className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
        >
          Get Started for Free
        </Link>
      </motion.div>
    </section>
  );
};

export default CallToAction;