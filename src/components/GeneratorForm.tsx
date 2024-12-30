import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StepIndicator from "./StepIndicator";
import { useToast } from "@/components/ui/use-toast";
import RevenueInput from "./form/RevenueInput";
import TimelineInput from "./form/TimelineInput";
import NicheInput from "./form/NicheInput";
import PreferencesInput from "./form/PreferencesInput";
import KnowledgeAssessment from "./form/KnowledgeAssessment";
import FormButtons from "./form/FormButtons";
import FormStep from "./form/FormStep";
import { supabase } from "@/integrations/supabase/client";

const GeneratorForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    noCodeKnowledge: "",
    codingKnowledge: "",
    revenue: "",
    targetMonths: "",
    niche: "",
    preferences: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.noCodeKnowledge && !formData.codingKnowledge) {
          toast({
            title: "Please complete the knowledge assessment",
            description: "Tell us about your experience level to continue",
          });
          return false;
        }
        break;
      case 2:
        if (!formData.revenue) {
          toast({
            title: "Please set a revenue target",
            description: "Enter your desired monthly recurring revenue to continue",
          });
          return false;
        }
        break;
      case 3:
        if (!formData.targetMonths) {
          toast({
            title: "Please select a timeline",
            description: "Choose your target timeline to continue",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    toast({
      title: "Generating your website idea",
      description: "We're crafting something unique for you...",
    });

    try {
      const { data, error } = await supabase.functions.invoke('generate-website-idea', {
        body: formData,
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

  const updateFormData = (field: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <StepIndicator currentStep={step} totalSteps={5} />
      
      <div className="min-h-[400px] mb-8">
        <AnimatePresence mode="wait">
          <FormStep step={1} currentStep={step}>
            <KnowledgeAssessment
              noCodeKnowledge={formData.noCodeKnowledge}
              setNoCodeKnowledge={updateFormData("noCodeKnowledge")}
              codingKnowledge={formData.codingKnowledge}
              setCodingKnowledge={updateFormData("codingKnowledge")}
            />
          </FormStep>

          <FormStep step={2} currentStep={step}>
            <RevenueInput 
              value={formData.revenue} 
              onChange={updateFormData("revenue")} 
            />
          </FormStep>

          <FormStep step={3} currentStep={step}>
            <TimelineInput 
              value={formData.targetMonths} 
              onChange={updateFormData("targetMonths")} 
            />
          </FormStep>

          <FormStep step={4} currentStep={step}>
            <NicheInput 
              value={formData.niche} 
              onChange={updateFormData("niche")} 
            />
          </FormStep>

          <FormStep step={5} currentStep={step}>
            <PreferencesInput 
              value={formData.preferences} 
              onChange={updateFormData("preferences")} 
            />
          </FormStep>
        </AnimatePresence>
      </div>

      <FormButtons
        step={step}
        isGenerating={isGenerating}
        onBack={handleBack}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default GeneratorForm;