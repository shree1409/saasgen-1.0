import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StepIndicator from "./StepIndicator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import RevenueInput from "./form/RevenueInput";
import TimelineInput from "./form/TimelineInput";
import NicheInput from "./form/NicheInput";
import PreferencesInput from "./form/PreferencesInput";
import KnowledgeAssessment from "./form/KnowledgeAssessment";
import { supabase } from "@/integrations/supabase/client";

const GeneratorForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [noCodeKnowledge, setNoCodeKnowledge] = useState("");
  const [codingKnowledge, setCodingKnowledge] = useState("");
  const [revenue, setRevenue] = useState("");
  const [targetMonths, setTargetMonths] = useState("");
  const [niche, setNiche] = useState("");
  const [preferences, setPreferences] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
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
    if (step === 3 && !targetMonths) {
      toast({
        title: "Please select a timeline",
        description: "Choose your target timeline to continue",
      });
      return;
    }
    if (step < 5) {
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

      navigate('/generated-idea', { state: { generatedIdea: data.idea } });
      
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
      <StepIndicator currentStep={step} totalSteps={5} />
      
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
            <TimelineInput value={targetMonths} onChange={setTargetMonths} />
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
            <NicheInput value={niche} onChange={setNiche} />
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <PreferencesInput value={preferences} onChange={setPreferences} />
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
          onClick={step === 5 ? handleSubmit : handleNext}
          disabled={isGenerating}
        >
          {step === 5 ? (isGenerating ? "Generating..." : "Generate Idea") : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default GeneratorForm;