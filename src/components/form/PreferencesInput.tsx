import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PreferencesInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PreferencesInput = ({ value, onChange }: PreferencesInputProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold mb-2">Additional Preferences</h2>
        <p className="text-muted-foreground">Share any specific requirements or preferences for your website</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="preferences">Other Preferences</Label>
        <Textarea
          id="preferences"
          placeholder="e.g., Mobile-first design, Integration with specific tools, Particular features you'd like"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[120px]"
        />
      </div>
    </div>
  );
};

export default PreferencesInput;