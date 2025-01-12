import Header from "@/components/landing/Header";
import GeneratedIdea from "@/components/generated-idea/GeneratedIdea";

const DemoBasic = () => {
  const demoData = {
    websiteName: "Basic Website Idea",
    description: "Get started with essential website features, development timeline, and a solid foundation. Perfect for launching your first online project.",
    keyFeatures: [
      "User-friendly interface",
      "Responsive design",
      "Basic user authentication",
      "Contact form integration",
      "SEO optimization"
    ],
    techStack: "React, Node.js, MongoDB",
    timelineBreakdown: "Month 1: Core features, Month 2: Testing and deployment",
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