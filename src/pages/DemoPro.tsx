import Header from "@/components/landing/Header";
import GeneratedIdea from "./GeneratedIdea";

const DemoPro = () => {
  const demoIdea = {
    websiteName: "AI Analytics Suite - Business Intelligence Platform",
    description: "Advanced analytics platform powered by artificial intelligence",
    keyFeatures: [
      "AI-powered data analysis",
      "Predictive modeling",
      "Custom dashboards",
      "Real-time monitoring",
      "Integration capabilities",
      "Advanced visualization tools",
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
      "Industry-specific packages"
    ],
    subscription_tier: "pro"
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

export default DemoPro;