import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TechnicalImplementationProps {
  techStack: string;
  timelineBreakdown: string;
}

const TechnicalImplementation = ({ techStack, timelineBreakdown }: TechnicalImplementationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Implementation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Recommended Tech Stack</h3>
          <p className="text-muted-foreground">{techStack}</p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Development Timeline</h3>
          <p className="text-muted-foreground">{timelineBreakdown}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicalImplementation;