import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Star } from "lucide-react";

interface KeyFeaturesProps {
  features: string[];
}

const KeyFeatures = ({ features }: KeyFeaturesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-500" />
          Key Features
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-4 border rounded-lg hover:shadow-md transition-shadow bg-card/50"
            >
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <div className="space-y-1">
                <span className="text-sm font-medium">Feature {index + 1}</span>
                <p className="text-muted-foreground">{feature}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyFeatures;