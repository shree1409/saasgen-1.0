import Header from "@/components/landing/Header";
import GeneratedIdea from "@/components/generated-idea/GeneratedIdea";

const DemoBasic = () => {
  const demoIdea = {
    websiteName: "TaskFlow - Project Management Simplified",
    description: "A streamlined project management tool for small teams",
    keyFeatures: [
      "Task organization and tracking",
      "Team collaboration features",
      "Basic reporting dashboard",
      "File sharing capabilities"
    ],
    techStack: "React, Node.js, MongoDB",
    timelineBreakdown: "3-4 months development timeline",
    marketPotential: "Growing market for project management tools",
    monetizationStrategy: [
      "Freemium model",
      "Monthly subscription plans",
      "Team-based pricing"
    ],
    subscription_tier: "basic"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <GeneratedIdea demoData={demoIdea} />
      </div>
    </div>
  );
};

export default DemoBasic;