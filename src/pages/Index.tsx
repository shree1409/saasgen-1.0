import Benefits from "@/components/landing/Benefits";
import Features from "@/components/landing/Features";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="bg-gradient-to-b from-white to-secondary/20">
          <Hero />
          <Features />
          <Benefits />
        </div>
      </main>
    </div>
  );
};

export default Index;