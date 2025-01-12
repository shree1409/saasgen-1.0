import Benefits from "@/components/landing/Benefits";
import Features from "@/components/landing/Features";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";

const Index = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
        <main className="pt-16">
          <Hero />
          <Features />
          <Benefits />
        </main>
      </div>
    </>
  );
};

export default Index;