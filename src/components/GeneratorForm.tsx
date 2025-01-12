import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "./StepIndicator";
import FormButtons from "./form/FormButtons";
import FormStepContent from "./form/FormStepContent";
import FormError from "./form/FormError";
import { useFormState } from "./form/useFormState";
import { validateStep } from "./form/FormValidation";
import { useGeneratorSubmit } from "@/hooks/useGeneratorSubmit";
import { useSubscriptionCheck } from "@/hooks/useSubscriptionCheck";
import { useToast } from "@/hooks/use-toast";

const GeneratorForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hasSubscription, setHasSubscription] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    step,
    setStep,
    formData,
    isGenerating,
    setIsGenerating,
    updateFormData,
  } = useFormState();

  useSubscriptionCheck(setError, setHasSubscription);

  const handleComplete = () => {
    toast({
      title: "Survey completed",
      description: "Please choose a subscription plan to generate your idea",
    });
    navigate('/pricing');
  };

  const handleNext = () => {
    if (!validateStep(step, formData)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    if (step < 5) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    setError(null);
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <StepIndicator currentStep={step} totalSteps={5} />
      <FormError error={error} />
      <FormStepContent
        currentStep={step}
        formData={formData}
        updateFormData={updateFormData}
      />
      <FormButtons
        step={step}
        isGenerating={isGenerating}
        onBack={handleBack}
        onNext={handleNext}
      />
    </div>
  );
};

export default GeneratorForm;