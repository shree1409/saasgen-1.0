import Header from "@/components/landing/Header";
import GeneratedIdea from "@/components/generated-idea/GeneratedIdea";

const DemoPro = () => {
  const demoIdea = {
    websiteName: "AI Analytics Suite - Business Intelligence Platform",
    description: "Advanced analytics platform powered by artificial intelligence",
    keyFeatures: [
      "AI-powered data analysis",
      "Predictive modeling",
      "Custom dashboards",
      "Integration capabilities",
      "Real-time monitoring",
      "Automated reporting",
      "Data security features"
    ],
    techStack: "Python, TensorFlow, React, Docker, Kubernetes",
    timelineBreakdown: "12-15 months development timeline",
    marketPotential: "High-growth market in AI and analytics sector",
    monetizationStrategy: [
      "Enterprise licensing",
      "Custom solutions",
      "API access fees",
      "Consulting services",
      "Premium support plans"
    ],
    subscription_tier: "pro" as const
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

export default DemoPro;