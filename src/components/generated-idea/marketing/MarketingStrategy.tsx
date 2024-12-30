import { Target, Users, TrendingUp, Megaphone } from "lucide-react";

const MarketingStrategy = () => {
  const strategies = [
    {
      icon: <Target className="w-5 h-5 text-blue-500" />,
      title: "Content Marketing",
      description: "Create valuable blog posts, tutorials, and case studies to establish authority in your niche. Focus on solving real problems your target audience faces.",
      tips: [
        "Create a content calendar",
        "Focus on SEO-optimized long-form content",
        "Include visual content like infographics",
        "Repurpose content across platforms"
      ]
    },
    {
      icon: <Users className="w-5 h-5 text-green-500" />,
      title: "Social Media Presence",
      description: "Build engaged communities on platforms where your target audience is most active. Share valuable insights and engage with followers regularly.",
      tips: [
        "Post consistently on key platforms",
        "Use platform-specific content formats",
        "Engage with industry influencers",
        "Run targeted social media ads"
      ]
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
      title: "SEO Optimization",
      description: "Implement strong SEO practices to increase organic traffic. Focus on both technical SEO and content optimization for better search rankings.",
      tips: [
        "Conduct keyword research",
        "Optimize meta descriptions and titles",
        "Improve site loading speed",
        "Build quality backlinks"
      ]
    },
    {
      icon: <Megaphone className="w-5 h-5 text-orange-500" />,
      title: "Email Marketing",
      description: "Build and nurture an email list to maintain user engagement and drive conversions through personalized communication.",
      tips: [
        "Offer valuable lead magnets",
        "Segment your email list",
        "A/B test email campaigns",
        "Automate email sequences"
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {strategies.map((strategy, index) => (
        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <div className="mt-1">{strategy.icon}</div>
            <div className="space-y-3 flex-1">
              <h4 className="font-semibold text-lg">{strategy.title}</h4>
              <p className="text-sm text-muted-foreground">{strategy.description}</p>
              <div className="space-y-2">
                <h5 className="font-medium text-sm">Key Action Items:</h5>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {strategy.tips.map((tip, tipIndex) => (
                    <li key={tipIndex}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketingStrategy;