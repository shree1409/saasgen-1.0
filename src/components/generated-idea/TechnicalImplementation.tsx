import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Clock, GitBranch } from "lucide-react";

interface TechnicalImplementationProps {
  techStack: string;
  timelineBreakdown: string;
}

const TechnicalImplementation = ({ techStack, timelineBreakdown }: TechnicalImplementationProps) => {
  const renderTechStackItems = () => {
    return techStack.split(',').map((tech, index) => (
      <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors">
        <Code2 className="w-5 h-5 text-blue-500" />
        <span className="text-muted-foreground">{tech.trim()}</span>
      </div>
    ));
  };

  const renderTimelinePhases = () => {
    const phases = timelineBreakdown.split('.').filter(phase => phase.trim().length > 0);
    return phases.map((phase, index) => (
      <div key={index} className="flex items-start space-x-3 p-3">
        <Clock className="w-5 h-5 text-purple-500 mt-1" />
        <span className="text-muted-foreground">{phase.trim()}</span>
      </div>
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-blue-500" />
          Technical Implementation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Recommended Tech Stack</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderTechStackItems()}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Development Timeline</h3>
          <div className="space-y-3 border rounded-lg p-4 bg-card/50">
            {renderTimelinePhases()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicalImplementation;