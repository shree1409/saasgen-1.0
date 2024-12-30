import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Lightbulb, Settings, BarChart, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: Lightbulb,
      title: "Share Your Vision",
      description: "Tell us about your goals, target revenue, and preferences. Our AI needs to understand your ambitions to generate the perfect website idea.",
      details: [
        "Set your monthly revenue target",
        "Specify your preferred niche",
        "Share your technical experience level",
        "Define your timeline"
      ]
    },
    {
      icon: Settings,
      title: "AI Processing",
      description: "Our advanced AI analyzes your inputs and cross-references them with market trends and successful business models.",
      details: [
        "Market analysis",
        "Competitor research",
        "Revenue potential assessment",
        "Technical feasibility check"
      ]
    },
    {
      icon: BarChart,
      title: "Receive Your Personalized Plan",
      description: "Get a comprehensive website concept complete with implementation details and growth strategies.",
      details: [
        "Detailed feature list",
        "Technology recommendations",
        "Development timeline",
        "Marketing strategy"
      ]
    },
    {
      icon: Rocket,
      title: "Start Building",
      description: "Use our provided resources and guidance to bring your website idea to life.",
      details: [
        "Access learning resources",
        "Follow the timeline",
        "Implement key features",
        "Launch your website"
      ]
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
              How It Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to transform your vision into a viable website concept
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Step {index + 1}
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-primary" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => navigate('/')}
              className="text-white"
            >
              Get Started Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;