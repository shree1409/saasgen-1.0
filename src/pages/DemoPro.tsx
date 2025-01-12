import Header from "@/components/landing/Header";
import GeneratedIdea from "@/components/generated-idea/GeneratedIdea";

const DemoPro = () => {
  const demoData = {
    websiteName: "HealthTech Analytics",
    description: "An AI-powered healthcare analytics platform that helps medical professionals track patient outcomes and optimize treatment plans using machine learning.",
    keyFeatures: [
      "Real-time data analytics",
      "Machine learning predictions",
      "HIPAA-compliant storage",
      "Interactive dashboards",
      "Automated reporting system"
    ],
    monetizationStrategy: [
      "Enterprise licensing model",
      "Per-user subscription pricing",
      "Custom integration services"
    ],
    techStack: "React, Python, TensorFlow, AWS, PostgreSQL",
    timelineBreakdown: "Month 1: Core platform, Month 2: ML integration, Month 3: Security & Compliance",
    marketPotential: "Healthcare analytics market growing at 24% CAGR",
    subscription_tier: "pro" as const
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

export default DemoPro;