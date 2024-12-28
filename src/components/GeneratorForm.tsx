import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepIndicator from "./StepIndicator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import RevenueInput from "./form/RevenueInput";
import NicheInput from "./form/NicheInput";
import PreferencesInput from "./form/PreferencesInput";
import KnowledgeAssessment from "./form/KnowledgeAssessment";
import { supabase } from "@/integrations/supabase/client";

interface GeneratedIdea {
  websiteName: string;
  description: string;
  keyFeatures: string[];
  monetizationStrategy: string[];
  techStack: string;
  timelineBreakdown: string;
  marketPotential: string;
}

const GeneratorForm = () => {
  const [step, setStep] = useState(1);
  const [noCodeKnowledge, setNoCodeKnowledge] = useState("");
  const [codingKnowledge, setCodingKnowledge] = useState("");
  const [targetMonths, setTargetMonths] = useState("");
  const [revenue, setRevenue] = useState("");
  const [niche, setNiche] = useState("");
  const [preferences, setPreferences] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdea, setGeneratedIdea] = useState<GeneratedIdea | null>(null);
  const { toast } = useToast();

  const handleNext = () => {
    if (step === 1 && !noCodeKnowledge && !codingKnowledge) {
      toast({
        title: "Please complete the knowledge assessment",
        description: "Tell us about your experience level to continue",
      });
      return;
    }
    if (step === 2 && !revenue) {
      toast({
        title: "Please set a revenue target",
        description: "Enter your desired monthly recurring revenue to continue",
      });
      return;
    }
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    toast({
      title: "Generating your website idea",
      description: "We're crafting something unique for you...",
    });

    try {
      const { data, error } = await supabase.functions.invoke('generate-website-idea', {
        body: {
          noCodeKnowledge,
          codingKnowledge,
          targetMonths,
          revenue,
          niche,
          preferences,
        },
      });

      if (error) throw error;

      setGeneratedIdea(data.idea);
      toast({
        title: "Idea generated successfully!",
        description: "Here's your personalized website concept.",
      });
    } catch (error) {
      console.error('Error generating idea:', error);
      toast({
        title: "Error generating idea",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <StepIndicator currentStep={step} totalSteps={4} />
      
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <KnowledgeAssessment
              noCodeKnowledge={noCodeKnowledge}
              setNoCodeKnowledge={setNoCodeKnowledge}
              codingKnowledge={codingKnowledge}
              setCodingKnowledge={setCodingKnowledge}
              targetMonths={targetMonths}
              setTargetMonths={setTargetMonths}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <RevenueInput value={revenue} onChange={setRevenue} />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <NicheInput value={niche} onChange={setNiche} />
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <PreferencesInput value={preferences} onChange={setPreferences} />
          </motion.div>
        )}

        {generatedIdea && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-secondary/30 rounded-lg space-y-4"
          >
            <h2 className="text-2xl font-bold">{generatedIdea.websiteName}</h2>
            <p className="text-muted-foreground">{generatedIdea.description}</p>
            
            <div>
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc list-inside space-y-1">
                {generatedIdea.keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Monetization Strategy:</h3>
              <ul className="list-disc list-inside space-y-1">
                {generatedIdea.monetizationStrategy.map((strategy, index) => (
                  <li key={index}>{strategy}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Recommended Tech Stack:</h3>
              <p>{generatedIdea.techStack}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Timeline Breakdown:</h3>
              <p>{generatedIdea.timelineBreakdown}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Market Potential:</h3>
              <p>{generatedIdea.marketPotential}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
        >
          Back
        </Button>
        <Button
          onClick={step === 4 ? handleSubmit : handleNext}
          disabled={isGenerating}
        >
          {step === 4 ? (isGenerating ? "Generating..." : "Generate Idea") : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default GeneratorForm;