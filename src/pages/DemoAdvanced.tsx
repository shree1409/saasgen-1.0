import GeneratedIdea from "./GeneratedIdea";

const DemoAdvanced = () => {
  const demoData = {
    websiteName: "TeamSync Pro",
    description: "An advanced team collaboration platform with integrated project management tools.",
    keyFeatures: [
      "Real-time collaboration",
      "Advanced project tracking",
      "Team analytics",
      "Resource management",
      "Custom workflows"
    ],
    monetizationStrategy: [
      "Tiered subscription plans",
      "Team licensing",
      "Priority support packages"
    ],
    techStack: "React, Node.js, PostgreSQL, Redis, WebSocket",
    timelineBreakdown: "Month 1-2: Core platform. Month 3: Advanced features. Month 4: Analytics and reporting.",
    marketPotential: "High growth potential in the enterprise collaboration market with 30% YoY growth."
  };

  return <GeneratedIdea demoData={demoData} />;
};

export default DemoAdvanced;