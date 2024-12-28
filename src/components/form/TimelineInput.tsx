import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TimelineInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TimelineInput = ({ value, onChange }: TimelineInputProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold mb-2">Target Timeline</h2>
        <p className="text-muted-foreground">How quickly do you want to launch?</p>
      </div>
      
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-1 gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="1-3" id="1-3" />
          <Label htmlFor="1-3">1-3 months</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="3-6" id="3-6" />
          <Label htmlFor="3-6">3-6 months</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="6-8" id="6-8" />
          <Label htmlFor="6-8">6-8 months</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="8-12" id="8-12" />
          <Label htmlFor="8-12">8-12 months</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="12+" id="12+" />
          <Label htmlFor="12+">12+ months</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default TimelineInput;