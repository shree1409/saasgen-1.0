import Benefits from "@/components/landing/Benefits";
import Features from "@/components/landing/Features";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";

const Index = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="bg-gradient-to-b from-white to-secondary/20">
          <Hero />
          <Features />
          <Benefits />
        </div>
      </main>
    </>
  );
};

export default Index;