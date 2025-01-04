import { motion } from "framer-motion";
import { 
  Target, 
  Lightbulb,
  BarChart3,
  Users,
  PenTool,
  DollarSign,
  Youtube,
  Share2
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Revenue Goal Setting",
    description: "Set your ideal monthly recurring revenue target and get tailored suggestions"
  },
  {
    icon: Lightbulb,
    title: "Smart Idea Generation",
    description: "AI-powered website concepts based on your goals and preferences"
  },
  {
    icon: BarChart3,
    title: "Market Analysis",
    description: "Get insights into your target audience and market opportunities"
  },
  {
    icon: Users,
    title: "Audience Targeting",
    description: "Define and understand your ideal customer profile"
  },
  {
    icon: PenTool,
    title: "Design Preferences",
    description: "Specify your preferred design aesthetic and core functionalities"
  },
  {
    icon: DollarSign,
    title: "Monetization Strategies",
    description: "Discover various ways to generate revenue from your website"
  },
  {
    icon: Youtube,
    title: "Learning Resources",
    description: "Access curated tutorials and guides for implementation"
  },
  {
    icon: Share2,
    title: "Share & Download",
    description: "Export and share your generated website concept"
  }
];

const Features = () => {
  return (
    <motion.section 
      id="features" 
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
        <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Everything you need to transform your website idea from concept to reality
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-xl bg-white/50 hover:bg-white/80 transition-colors border hover:border-primary/20"
          >
            <feature.icon className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Features;