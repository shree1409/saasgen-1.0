import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface KnowledgeAssessmentProps {
  noCodeKnowledge: string;
  setNoCodeKnowledge: (value: string) => void;
  codingKnowledge: string;
  setCodingKnowledge: (value: string) => void;
}

const KnowledgeAssessment = ({
  noCodeKnowledge,
  setNoCodeKnowledge,
  codingKnowledge,
  setCodingKnowledge,
}: KnowledgeAssessmentProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold mb-2">Customize Your Journey</h2>
        <p className="text-muted-foreground">Tell us about your experience level</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>No-Code Website Building Experience</Label>
          <RadioGroup
            value={noCodeKnowledge}
            onValueChange={setNoCodeKnowledge}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="no-code-none" />
              <Label htmlFor="no-code-none">I have no knowledge</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="little" id="no-code-little" />
              <Label htmlFor="no-code-little">I have a little bit of knowledge</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expert" id="no-code-expert" />
              <Label htmlFor="no-code-expert">I excel at it</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Coding Website Experience</Label>
          <RadioGroup
            value={codingKnowledge}
            onValueChange={setCodingKnowledge}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="code-none" />
              <Label htmlFor="code-none">I have no knowledge</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="little" id="code-little" />
              <Label htmlFor="code-little">I have a little bit of knowledge</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expert" id="code-expert" />
              <Label htmlFor="code-expert">I excel at it</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeAssessment;