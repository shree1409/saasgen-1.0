import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0.8 }}
          animate={{ scale: currentStep === index + 1 ? 1 : 0.8 }}
          className={cn(
            "w-2.5 h-2.5 rounded-full transition-colors duration-200",
            currentStep === index + 1
              ? "bg-primary"
              : currentStep > index + 1
              ? "bg-primary/30"
              : "bg-secondary"
          )}
        />
      ))}
    </div>
  );
};

export default StepIndicator;