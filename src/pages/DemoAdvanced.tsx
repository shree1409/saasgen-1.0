import Header from "@/components/landing/Header";
import GeneratedIdea from "@/components/generated-idea/GeneratedIdea";

const DemoAdvanced = () => {
  const demoIdea = {
    websiteName: "SkillShare Hub - Online Learning Platform",
    description: "A marketplace for skill-sharing and online courses",
    keyFeatures: [
      "Course creation tools",
      "Live streaming capabilities",
      "Interactive quizzes",
      "Progress tracking",
      "Community forums",
      "Instructor analytics"
    ],
    techStack: "Next.js, GraphQL, PostgreSQL, AWS",
    timelineBreakdown: "6-8 months development timeline",
    marketPotential: "Expanding e-learning market with high growth potential",
    monetizationStrategy: [
      "Revenue sharing with instructors",
      "Premium subscriptions",
      "Course marketplace fees",
      "Enterprise solutions"
    ],
    subscription_tier: "advanced"
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

export default DemoAdvanced;