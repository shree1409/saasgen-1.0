import Header from "@/components/landing/Header";
import GeneratedIdea from "@/components/generated-idea/GeneratedIdea";

const DemoPro = () => {
  const demoData = {
    websiteName: "Professional Enterprise Solution",
    description: "Comprehensive website solution with advanced features, marketing strategies, and learning resources for maximum success.",
    keyFeatures: [
      "Enterprise-grade security",
      "Advanced analytics dashboard",
      "Multi-tenant architecture",
      "Automated scaling",
      "Custom integrations"
    ],
    monetizationStrategy: [
      "Enterprise licensing",
      "White-label solutions",
      "Custom development services"
    ],
    techStack: "React, Node.js, PostgreSQL, Kubernetes",
    timelineBreakdown: "Month 1: Architecture, Month 2: Core development, Month 3: Enterprise features",
    marketPotential: "Enterprise solutions market growing at 15% CAGR, with high demand for scalable solutions",
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