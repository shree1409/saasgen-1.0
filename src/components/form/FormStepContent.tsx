import { AnimatePresence } from "framer-motion";
import { FormData } from "./FormValidation";
import FormStep from "./FormStep";
import KnowledgeAssessment from "./KnowledgeAssessment";
import RevenueInput from "./RevenueInput";
import TimelineInput from "./TimelineInput";
import NicheInput from "./NicheInput";
import PreferencesInput from "./PreferencesInput";

interface FormStepContentProps {
  currentStep: number;
  formData: FormData;
  updateFormData: (field: keyof FormData) => (value: string) => void;
}

const FormStepContent = ({ currentStep, formData, updateFormData }: FormStepContentProps) => {
  return (
    <div className="min-h-[400px] mb-8">
      <AnimatePresence mode="wait">
        <FormStep step={1} currentStep={currentStep}>
          <KnowledgeAssessment
            noCodeKnowledge={formData.noCodeKnowledge}
            setNoCodeKnowledge={updateFormData("noCodeKnowledge")}
            codingKnowledge={formData.codingKnowledge}
            setCodingKnowledge={updateFormData("codingKnowledge")}
          />
        </FormStep>

        <FormStep step={2} currentStep={currentStep}>
          <RevenueInput 
            value={formData.revenue} 
            onChange={updateFormData("revenue")} 
          />
        </FormStep>

        <FormStep step={3} currentStep={currentStep}>
          <TimelineInput 
            value={formData.targetMonths} 
            onChange={updateFormData("targetMonths")} 
          />
        </FormStep>

        <FormStep step={4} currentStep={currentStep}>
          <NicheInput 
            value={formData.niche} 
            onChange={updateFormData("niche")} 
          />
        </FormStep>

        <FormStep step={5} currentStep={currentStep}>
          <PreferencesInput 
            value={formData.preferences} 
            onChange={updateFormData("preferences")} 
          />
        </FormStep>
      </AnimatePresence>
    </div>
  );
};

export default FormStepContent;