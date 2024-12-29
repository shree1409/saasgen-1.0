import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KeyFeaturesProps {
  features: string[];
}

const KeyFeatures = ({ features }: KeyFeaturesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Features</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-800 flex-shrink-0">
                {index + 1}
              </div>
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default KeyFeatures;