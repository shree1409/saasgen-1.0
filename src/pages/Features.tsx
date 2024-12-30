import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, Target, Shield, Sparkles, Brain, Rocket, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Ideation",
      description: "Our advanced AI analyzes market trends and your preferences to generate unique, viable website concepts tailored to your goals."
    },
    {
      icon: Target,
      title: "Revenue-Focused Approach",
      description: "Every generated idea comes with detailed monetization strategies and revenue projections based on your financial goals."
    },
    {
      icon: Shield,
      title: "Market Validation",
      description: "Get instant market analysis and potential audience insights to validate your website concept before investing time and resources."
    },
    {
      icon: Sparkles,
      title: "Customized Tech Stack",
      description: "Receive personalized technology recommendations based on your experience level and project requirements."
    },
    {
      icon: Clock,
      title: "Timeline Planning",
      description: "Get detailed development timelines and milestone breakdowns to help you plan your project effectively."
    },
    {
      icon: Rocket,
      title: "Launch Strategy",
      description: "Comprehensive marketing and launch strategies tailored to your website's niche and target audience."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <div className="container px-4 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">
              Powerful Features for Your Success
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how our website idea generator helps you create successful online businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel rounded-xl p-6 hover-scale"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => navigate('/')}
              className="text-white"
            >
              Try It Now
              <Zap className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;