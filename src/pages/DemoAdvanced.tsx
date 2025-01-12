import Header from "@/components/landing/Header";
import GeneratedIdea from "@/components/generated-idea/GeneratedIdea";

const DemoAdvanced = () => {
  const demoData = {
    websiteName: "Advanced Website Solution",
    description: "Elevate your online presence with advanced features and market analysis. Perfect for growing businesses.",
    keyFeatures: [
      "Advanced user management",
      "Payment gateway integration",
      "Real-time analytics",
      "Custom API endpoints",
      "Performance optimization"
    ],
    monetizationStrategy: [
      "Subscription-based model",
      "Freemium features",
      "Premium support packages"
    ],
    techStack: "React, Node.js, PostgreSQL, Redis",
    timelineBreakdown: "Month 1: Core features, Month 2: Advanced integrations, Month 3: Testing and optimization",
    marketPotential: "Enterprise solutions market growing at 15% CAGR, with high demand for scalable solutions",
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