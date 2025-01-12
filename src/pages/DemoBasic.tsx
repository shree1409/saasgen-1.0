import Header from "@/components/landing/Header";
import GeneratedIdea from "./GeneratedIdea";

const DemoBasic = () => {
  const demoIdea = {
    title: "TaskFlow - Project Management Simplified",
    description: "A streamlined project management tool for small teams",
    features: [
      "Task organization and tracking",
      "Team collaboration features",
      "Basic reporting dashboard",
      "File sharing capabilities"
    ],
    tech_stack: "React, Node.js, MongoDB",
    timeline_breakdown: "3-4 months development timeline",
    market_potential: "Growing market for project management tools",
    monetization_strategies: [
      "Freemium model",
      "Monthly subscription plans",
      "Team-based pricing"
    ],
    subscription_tier: "basic"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <GeneratedIdea demoData={demoIdea} />
      </main>
    </div>
  );
};

export default DemoBasic;