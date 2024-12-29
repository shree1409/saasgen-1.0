import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Users, Megaphone } from "lucide-react";

interface MarketingStrategyProps {
  marketPotential: string;
}

const MarketingSection = ({ marketPotential }: MarketingStrategyProps) => {
  const strategies = [
    {
      icon: <Target className="w-5 h-5 text-blue-500" />,
      title: "Content Marketing",
      description: "Create valuable blog posts and tutorials to establish authority in your niche"
    },
    {
      icon: <Users className="w-5 h-5 text-green-500" />,
      title: "Social Media Presence",
      description: "Build engaged communities on platforms where your target audience is most active"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
      title: "SEO Optimization",
      description: "Implement strong SEO practices to increase organic traffic"
    },
    {
      icon: <Megaphone className="w-5 h-5 text-orange-500" />,
      title: "Email Marketing",
      description: "Build an email list to nurture leads and maintain user engagement"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Market Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-line mb-6">
            {marketPotential}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Marketing Strategies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategies.map((strategy, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border hover:shadow-md transition-shadow">
                <div className="mt-1">{strategy.icon}</div>
                <div>
                  <h4 className="font-semibold mb-1">{strategy.title}</h4>
                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingSection;