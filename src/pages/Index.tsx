import Benefits from "@/components/landing/Benefits";
import Features from "@/components/landing/Features";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#1A1F2C]">
      <Header />
      <main className="flex-1">
        <Hero />
        <Benefits />
        <Features />
      </main>
    </div>
  );
};

export default Index;