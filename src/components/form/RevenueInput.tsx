import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RevenueInputProps {
  value: string;
  onChange: (value: string) => void;
}

const RevenueInput = ({ value, onChange }: RevenueInputProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold mb-2">Set Your Revenue Goal</h2>
        <p className="text-muted-foreground">What's your target monthly recurring revenue?</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="revenue">Monthly Revenue Target ($)</Label>
        <Input
          id="revenue"
          type="number"
          min="0"
          placeholder="e.g., 5000"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default RevenueInput;