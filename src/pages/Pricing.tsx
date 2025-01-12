import { useSubscriptionManagement } from "@/hooks/useSubscriptionManagement";
import { PricingHeader } from "@/components/pricing/PricingHeader";
import { PricingTierCard } from "@/components/pricing/PricingTierCard";

const tiers = [
  {
    name: "Basic",
    priceId: "price_1QdiOkBNGIJ8hstK75BVXEvj",
    price: "$15",
    description: "Essential features for getting started with development timeline",
    demoPath: "/demo-basic",
    features: [
      "Generate basic website ideas",
      "Access to key features list",
      "Basic tech stack suggestions",
      "Simple project overview",
      "Development timeline",
    ],
  },
  {
    name: "Advanced",
    priceId: "price_1Qcwy0BNGIJ8hstKYmE68GcO",
    price: "$25",
    description: "Enhanced features with market analysis and monetization strategies",
    demoPath: "/demo-advanced",
    features: [
      "Everything in Basic",
      "Market analysis",
      "Detailed project insights",
      "Enhanced suggestions",
      "Monetization strategies",
    ],
  },
  {
    name: "Pro",
    priceId: "price_1QcwtBBNGIJ8hstK31w61Ihy",
    price: "$35",
    description: "Full access to all premium features with marketing strategies",
    demoPath: "/demo-pro",
    features: [
      "Everything in Advanced",
      "Learning resources",
      "Video tutorials",
      "Implementation guides",
      "Marketing strategies",
    ],
  },
];

const Pricing = () => {
  const { isLoading, handleSubscribe } = useSubscriptionManagement();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12">
      <div className="container px-4 mx-auto">
        <PricingHeader 
          title="Simple, Transparent Pricing"
          subtitle="Choose the perfect plan for your needs"
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <PricingTierCard
              key={tier.name}
              {...tier}
              onSubscribe={handleSubscribe}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;