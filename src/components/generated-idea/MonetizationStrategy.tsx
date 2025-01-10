import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Coins, TrendingUp } from "lucide-react";

interface MonetizationStrategyProps {
  strategies: string[];
}

const MonetizationStrategy = ({ strategies }: MonetizationStrategyProps) => {
  if (!strategies || strategies.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-green-500" />
            Monetization Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6 border rounded-lg bg-card/50">
            <span className="text-muted-foreground">No monetization strategies specified</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-green-500" />
          Monetization Strategy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {strategies.map((strategy, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-4 border rounded-lg hover:shadow-md transition-shadow bg-card/50"
            >
              <div className="flex-shrink-0">
                {index % 2 === 0 ? (
                  <Coins className="w-5 h-5 text-yellow-500" />
                ) : (
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                )}
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">Revenue Stream {index + 1}</h4>
                <p className="text-muted-foreground">{strategy}</p>
                <div className="mt-2 text-sm text-muted-foreground">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Implementation timeline: {index < 2 ? 'Short-term' : 'Medium-term'}</li>
                    <li>Priority level: {index < 2 ? 'High' : 'Medium'}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonetizationStrategy;