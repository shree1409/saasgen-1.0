import Header from "@/components/landing/Header";
import GeneratedIdea from "./GeneratedIdea";

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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <GeneratedIdea demoData={demoIdea} />
      </main>
    </div>
  );
};

export default DemoAdvanced;