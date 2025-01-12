import Header from "@/components/landing/Header";
import GeneratedIdea from "@/components/generated-idea/GeneratedIdea";

const DemoBasic = () => {
  const demoData = {
    websiteName: "EcoSwap Marketplace",
    description: "A sustainable marketplace platform where users can trade, sell, or swap eco-friendly products and services within their local community.",
    keyFeatures: [
      "User-friendly product listing and search",
      "Secure in-app messaging system",
      "Eco-impact scoring system",
      "Local community groups and events",
      "Verified seller program"
    ],
    techStack: "React, Node.js, MongoDB, AWS S3",
    subscription_tier: "basic" as const
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

export default DemoBasic;