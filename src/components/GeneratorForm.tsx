import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepIndicator from "./StepIndicator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import RevenueInput from "./form/RevenueInput";
import NicheInput from "./form/NicheInput";
import PreferencesInput from "./form/PreferencesInput";
import KnowledgeAssessment from "./form/KnowledgeAssessment";

const GeneratorForm = () => {
  const [step, setStep] = useState(1);
  const [noCodeKnowledge, setNoCodeKnowledge] = useState("");
  const [codingKnowledge, setCodingKnowledge] = useState("");
  const [targetMonths, setTargetMonths] = useState("");
  const [revenue, setRevenue] = useState("");
  const [niche, setNiche] = useState("");
  const [preferences, setPreferences] = useState("");
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

  const handleSubmit = () => {
    toast({
      title: "Generating your website idea",
      description: "We're crafting something unique for you...",
    });
    // Add idea generation logic here
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
        >
          {step === 4 ? "Generate Idea" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default GeneratorForm;