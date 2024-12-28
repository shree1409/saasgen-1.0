import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

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
    <div className="container px-4 py-8">
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
        <div className="glass-panel rounded-2xl p-8 space-y-6">
          <h1 className="text-3xl font-bold">{generatedIdea.websiteName}</h1>
          <p className="text-lg text-muted-foreground">{generatedIdea.description}</p>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">Key Features</h2>
            <ul className="list-disc list-inside space-y-2">
              {generatedIdea.keyFeatures.map((feature, index) => (
                <li key={index} className="text-muted-foreground">{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Monetization Strategy</h2>
            <ul className="list-disc list-inside space-y-2">
              {generatedIdea.monetizationStrategy.map((strategy, index) => (
                <li key={index} className="text-muted-foreground">{strategy}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Tech Stack</h2>
            <p className="text-muted-foreground">{generatedIdea.techStack}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Timeline</h2>
            <p className="text-muted-foreground">{generatedIdea.timelineBreakdown}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Market Potential</h2>
            <p className="text-muted-foreground">{generatedIdea.marketPotential}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GeneratedIdea;