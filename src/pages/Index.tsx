import Benefits from "@/components/landing/Benefits";
import Features from "@/components/landing/Features";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="bg-gradient-to-b from-white to-secondary/20">
        <main>
          <Hero />
          <Features />
          <Benefits />
        </main>
      </div>
    </div>
  );
};

export default Index;