import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Megaphone } from "lucide-react";
import MarketAnalysis from "./marketing/MarketAnalysis";
import MarketingStrategy from "./marketing/MarketingStrategy";

interface MarketingSectionProps {
  marketPotential: string;
}

const MarketingSection = ({ marketPotential }: MarketingSectionProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="w-6 h-6 text-blue-500" />
            Market Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MarketAnalysis marketPotential={marketPotential} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-blue-500" />
            Marketing Strategy Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MarketingStrategy />
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingSection;