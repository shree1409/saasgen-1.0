import { Globe, LineChart, Rocket } from "lucide-react";

interface MarketAnalysisProps {
  marketPotential: string;
}

const MarketAnalysis = ({ marketPotential }: MarketAnalysisProps) => {
  const analyses = [
    {
      icon: <Globe className="w-5 h-5 text-cyan-500" />,
      title: "Market Size & Opportunity",
      content: marketPotential
    },
    {
      icon: <LineChart className="w-5 h-5 text-indigo-500" />,
      title: "Growth Potential",
      content: "Analysis of market trends and future growth opportunities based on current market dynamics and industry developments."
    },
    {
      icon: <Rocket className="w-5 h-5 text-rose-500" />,
      title: "Competitive Advantage",
      content: "Identification of unique selling propositions and strategies to stand out in the market."
    }
  ];

  return (
    <div className="space-y-6">
      {analyses.map((analysis, index) => (
        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            {analysis.icon}
            <h3 className="font-semibold">{analysis.title}</h3>
          </div>
          <p className="text-muted-foreground">{analysis.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MarketAnalysis;