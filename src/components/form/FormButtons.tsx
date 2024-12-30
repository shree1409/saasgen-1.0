import { Button } from "@/components/ui/button";

interface FormButtonsProps {
  step: number;
  isGenerating: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const FormButtons = ({ step, isGenerating, onBack, onNext, onSubmit }: FormButtonsProps) => {
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
        onClick={step === 5 ? onSubmit : onNext}
        disabled={isGenerating}
        className="text-white"
      >
        {step === 5 ? (isGenerating ? "Generating..." : "Generate Idea") : "Next"}
      </Button>
    </div>
  );
};

export default FormButtons;