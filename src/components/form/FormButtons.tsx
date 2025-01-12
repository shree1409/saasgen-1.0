import { Button } from "@/components/ui/button";

interface FormButtonsProps {
  step: number;
  isGenerating: boolean;
  onBack: () => void;
  onNext: () => void;
}

const FormButtons = ({ step, isGenerating, onBack, onNext }: FormButtonsProps) => {
  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={step === 1}
        className="text-foreground"
      >
        Back
      </Button>
      <Button
        onClick={onNext}
        disabled={isGenerating}
        className="text-white"
      >
        {step === 5 ? "Complete Survey" : "Next"}
      </Button>
    </div>
  );
};

export default FormButtons;