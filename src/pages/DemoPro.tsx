import GeneratedIdea from "./GeneratedIdea";

const DemoPro = () => {
  const demoData = {
    websiteName: "EnterpriseHub Elite",
    description: "A comprehensive enterprise solution for large-scale business operations and analytics.",
    keyFeatures: [
      "Enterprise-grade security",
      "Advanced analytics dashboard",
      "Custom integrations",
      "Automated workflows",
      "Multi-team management"
    ],
    monetizationStrategy: [
      "Enterprise licensing",
      "Custom development services",
      "White-label solutions",
      "Consulting services"
    ],
    techStack: "React, Node.js, PostgreSQL, Kubernetes, ElasticSearch, Redis",
    timelineBreakdown: "Month 1-2: Core platform. Month 3-4: Enterprise features. Month 5-6: Security and scaling.",
    marketPotential: "Enterprise software market growing at 35% annually, particularly strong in financial and healthcare sectors."
  };

  return <GeneratedIdea demoData={demoData} />;
};

export default DemoPro;