import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NicheInputProps {
  value: string;
  onChange: (value: string) => void;
}

const NicheInput = ({ value, onChange }: NicheInputProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold mb-2">Define Your Niche</h2>
        <p className="text-muted-foreground">What industry or market are you targeting? (Optional)</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="niche">Business Niche</Label>
        <Input
          id="niche"
          placeholder="e.g., Sustainable Fashion, Digital Marketing, Health Tech"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default NicheInput;