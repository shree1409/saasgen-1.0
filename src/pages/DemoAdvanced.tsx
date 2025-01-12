import Header from "@/components/landing/Header";
import GeneratedIdea from "@/components/generated-idea/GeneratedIdea";

const DemoAdvanced = () => {
  const demoData = {
    websiteName: "SkillShare Hub",
    description: "A platform connecting skilled professionals with learners for personalized mentorship and skill development across various domains.",
    keyFeatures: [
      "Advanced matching algorithm",
      "Video conferencing integration",
      "Progress tracking dashboard",
      "Resource sharing system",
      "Scheduling and calendar management"
    ],
    monetizationStrategy: [
      "Premium membership tiers",
      "Commission from session bookings",
      "Sponsored mentor listings"
    ],
    techStack: "React, Node.js, PostgreSQL, WebRTC, Redis",
    timelineBreakdown: "Month 1: Core platform development, Month 2: Video integration, Month 3: Payment systems",
    marketPotential: "Growing online learning market with 15% CAGR",
    subscription_tier: "advanced" as const
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Header />
      <div className="container px-4 py-12">
        <GeneratedIdea demoData={demoData} />
      </div>
    </div>
  );
};

export default DemoAdvanced;