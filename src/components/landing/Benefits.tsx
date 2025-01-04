import { motion } from "framer-motion";
import { Zap, Target, Users, Rocket } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "AI-Powered Ideas",
    description: "Get unique SaaS concepts tailored to your needs"
  },
  {
    icon: Target,
    title: "Market Focus",
    description: "Target the right audience with precision"
  },
  {
    icon: Users,
    title: "User-Centric",
    description: "Design with your users in mind"
  },
  {
    icon: Rocket,
    title: "Launch Fast",
    description: "Get actionable steps to launch quickly"
  }
];

const Benefits = () => {
  return (
    <motion.section 
      className="mb-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4">Why Choose SaasGen?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our AI-powered platform helps entrepreneurs and creators build successful SaaS businesses
        </p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-panel rounded-xl p-6 hover-scale"
          >
            <benefit.icon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
            <p className="text-muted-foreground">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Benefits;