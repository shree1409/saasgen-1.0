import GeneratedIdea from "./GeneratedIdea";

const DemoBasic = () => {
  const demoData = {
    websiteName: "TaskFlow Basic",
    description: "A streamlined task management platform for individuals and small teams.",
    keyFeatures: [
      "Task creation and management",
      "Basic project organization",
      "Simple progress tracking",
      "Personal dashboard"
    ],
    monetizationStrategy: [
      "Freemium model with basic features",
      "Premium user upgrades"
    ],
    techStack: "React, Node.js, MongoDB",
    timelineBreakdown: "Month 1: Core features. Month 2: Testing and deployment.",
    marketPotential: "Growing demand for personal productivity tools."
  };

  return <GeneratedIdea demoData={demoData} />;
};

export default DemoBasic;