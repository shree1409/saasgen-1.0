import Header from "@/components/landing/Header";
import PricingHeader from "@/components/pricing/PricingHeader";
import PricingCard from "@/components/pricing/PricingCard";
import PricingSkeleton from "@/components/pricing/PricingSkeleton";
import PricingError from "@/components/pricing/PricingError";
import { useSubscriptionManagement } from "@/hooks/useSubscriptionManagement";
import { usePrices } from "@/hooks/usePrices";
import { useEffect } from "react";

const Pricing = () => {
  const { isLoading: subscriptionLoading, handleSubscribe } = useSubscriptionManagement();
  const { data: prices, isLoading: pricesLoading, error } = usePrices();

  useEffect(() => {
    console.log('Current prices data:', prices);
  }, [prices]);

  const getDescription = (price: any) => {
    switch (price.tier.toLowerCase()) {
      case 'pro':
        return "Everything in Advanced plus Market Analysis + Marketing Strategy Roadmap and Learning Resources";
      case 'advanced':
        return "Everything in Basic plus Technical Implementation, Development Timeline and Monetization Strategy";
      default:
        return "Generate website ideas with basic features and monetization suggestions";
    }
  };

  if (subscriptionLoading || pricesLoading) {
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
    console.error('Error in Pricing component:', error);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Header />
      <div className="container pt-24 px-4 py-12">
        <PricingHeader />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {Array.isArray(prices) && prices.length > 0 ? (
            prices.map((price) => (
              <PricingCard
                key={price.id}
                price={price}
                onSubscribe={handleSubscribe}
                getDescription={getDescription}
              />
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              No pricing plans are currently available. Please try again later.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;