import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import KeyFeatures from "@/components/generated-idea/KeyFeatures";
import MonetizationStrategy from "@/components/generated-idea/MonetizationStrategy";
import TechnicalImplementation from "@/components/generated-idea/TechnicalImplementation";
import MarketingSection from "@/components/generated-idea/MarketingSection";
import LearningResources from "@/components/generated-idea/LearningResources";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  const generatedIdea = location.state?.generatedIdea as GeneratedIdea;

  if (!generatedIdea) {
    navigate('/');
    return null;
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Share this idea with others",
      });
    } catch (err) {
      toast({
        title: "Failed to copy link",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [JSON.stringify(generatedIdea, null, 2)],
      { type: "application/json" }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${generatedIdea.websiteName.toLowerCase().replace(/\s+/g, '-')}-idea.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Generator
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="glass-panel rounded-2xl p-8 space-y-8">
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            >
              {generatedIdea.websiteName}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground leading-relaxed"
            >
              {generatedIdea.description}
            </motion.p>
          </div>

          <div className="grid gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <KeyFeatures features={generatedIdea.keyFeatures} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <MonetizationStrategy strategies={generatedIdea.monetizationStrategy} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TechnicalImplementation 
                techStack={generatedIdea.techStack}
                timelineBreakdown={generatedIdea.timelineBreakdown}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <MarketingSection marketPotential={generatedIdea.marketPotential} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <LearningResources techStack={generatedIdea.techStack} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GeneratedIdea;