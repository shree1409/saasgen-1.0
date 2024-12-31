import { toast } from "@/components/ui/use-toast";

export interface FormData {
  noCodeKnowledge: string;
  codingKnowledge: string;
  revenue: string;
  targetMonths: string;
  niche: string;
  preferences: string;
}

export const validateStep = (step: number, formData: FormData): boolean => {
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