import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MonetizationStrategyProps {
  strategies: string[];
}

const MonetizationStrategy = ({ strategies }: MonetizationStrategyProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monetization Strategy</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {strategies.map((strategy, index) => (
            <li key={index} className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-muted-foreground">{strategy}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default MonetizationStrategy;