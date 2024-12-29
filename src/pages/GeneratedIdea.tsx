import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import KeyFeatures from "@/components/generated-idea/KeyFeatures";
import MonetizationStrategy from "@/components/generated-idea/MonetizationStrategy";
import TechnicalImplementation from "@/components/generated-idea/TechnicalImplementation";
import MarketingSection from "@/components/generated-idea/MarketingSection";
import LearningResources from "@/components/generated-idea/LearningResources";

interface GeneratedIdea {
  websiteName: string;
  description: string;
  keyFeatures: string[];
  monetizationStrategy: string[];
  techStack: string;
  timelineBreakdown: string;
  marketPotential: string;
}

const GeneratedIdea = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const generatedIdea = location.state?.generatedIdea as GeneratedIdea;

  if (!generatedIdea) {
    navigate('/');
    return null;
  }

  return (
    <div className="container px-4 py-8 max-w-6xl">
      <Button 
        variant="outline" 
        onClick={() => navigate('/')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Generator
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="glass-panel rounded-2xl p-8 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {generatedIdea.websiteName}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {generatedIdea.description}
            </p>
          </div>

          <KeyFeatures features={generatedIdea.keyFeatures} />
          <MonetizationStrategy strategies={generatedIdea.monetizationStrategy} />
          <TechnicalImplementation 
            techStack={generatedIdea.techStack}
            timelineBreakdown={generatedIdea.timelineBreakdown}
          />
          <MarketingSection marketPotential={generatedIdea.marketPotential} />
          <LearningResources techStack={generatedIdea.techStack} />
        </div>
      </motion.div>
    </div>
  );
};

export default GeneratedIdea;