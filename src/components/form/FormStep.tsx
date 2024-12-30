import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FormStepProps {
  children: ReactNode;
  step: number;
  currentStep: number;
}

const FormStep = ({ children, step, currentStep }: FormStepProps) => {
  if (step !== currentStep) return null;

  return (
    <motion.div
      key={`step${step}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {children}
    </motion.div>
  );
};

export default FormStep;