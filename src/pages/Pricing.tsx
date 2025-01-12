import Header from "@/components/landing/Header";
import PricingHeader from "@/components/pricing/PricingHeader";
import PricingCard from "@/components/pricing/PricingCard";
import PricingSkeleton from "@/components/pricing/PricingSkeleton";
import PricingError from "@/components/pricing/PricingError";
import { useSubscriptionManagement } from "@/hooks/useSubscriptionManagement";
import { usePrices } from "@/hooks/usePrices";

const Pricing = () => {
  const { isLoading: subscriptionLoading, handleSubscribe } = useSubscriptionManagement();
  const { data: prices, isLoading: pricesLoading, error } = usePrices();

  console.log('Rendering Pricing component with prices:', prices);

  const getDescription = (price: any) => {
    switch (price.tier) {
      case 'pro':
        return "Everything in Advanced plus Market Analysis + Marketing Strategy Roadmap and Learning Resources";
      case 'advanced':
        return "Everything in Basic plus Technical Implementation, Development Timeline and Monetization Strategy";
      default:
        return "Generate website ideas with basic features and monetization suggestions";
    }
  };

  const isLoading = subscriptionLoading || pricesLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
        <Header />
        <div className="container pt-24 px-4 py-12">
          <PricingHeader />
          <PricingSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
        <Header />
        <div className="container pt-24 px-4 py-12">
          <PricingHeader />
          <PricingError />
        </div>
      </div>
    );
  }

  if (!prices || prices.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
        <Header />
        <div className="container pt-24 px-4 py-12">
          <PricingHeader />
          <div className="text-center text-gray-500">
            No pricing plans are currently available. Please check back later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Header />
      <div className="container pt-24 px-4 py-12">
        <PricingHeader />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {prices.map((price) => (
            <PricingCard
              key={price.id}
              price={price}
              onSubscribe={handleSubscribe}
              getDescription={getDescription}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;