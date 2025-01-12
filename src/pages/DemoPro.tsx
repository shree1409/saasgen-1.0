import Header from "@/components/landing/Header";
import GeneratedIdea from "./GeneratedIdea";

const DemoPro = () => {
  const demoIdea = {
    title: "AI Analytics Suite - Business Intelligence Platform",
    description: "Advanced analytics platform powered by artificial intelligence",
    features: [
      "AI-powered data analysis",
      "Predictive modeling",
      "Custom dashboards",
      "Real-time monitoring",
      "Integration capabilities",
      "Advanced visualization tools",
      "Automated reporting",
      "Data security features"
    ],
    tech_stack: "Python, TensorFlow, React, Docker, Kubernetes",
    timeline_breakdown: "12-15 months development timeline",
    market_potential: "High-growth market in AI and analytics sector",
    monetization_strategies: [
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