import { useState } from "react";
import { FormData } from "./FormValidation";

export const useFormState = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    noCodeKnowledge: "",
    codingKnowledge: "",
    revenue: "",
    targetMonths: "",
    niche: "",
    preferences: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const updateFormData = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    step,
    setStep,
    formData,
    isGenerating,
    setIsGenerating,
    updateFormData,
  };
};