import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/landing/Header";
import PricingHeader from "@/components/pricing/PricingHeader";
import PricingCard from "@/components/pricing/PricingCard";
import { useSubscriptionManagement } from "@/hooks/useSubscriptionManagement";

const Pricing = () => {
  const { isLoading: subscriptionLoading, handleSubscribe } = useSubscriptionManagement();

  const { data: prices, isLoading: pricesLoading } = useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prices')
        .select('*')
        .eq('active', true)
        .order('unit_amount');
      
      if (error) {
        console.error('Error fetching prices:', error);
        throw error;
      }
      return data;
    }
  });

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

  if (subscriptionLoading || pricesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
        <Header />
        <div className="container pt-24 px-4 py-12 flex items-center justify-center">
          <div className="animate-pulse text-lg">Loading pricing information...</div>
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
          {prices?.map((price) => (
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