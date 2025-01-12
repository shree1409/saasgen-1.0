import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/landing/Header";
import PricingHeader from "@/components/pricing/PricingHeader";
import PricingCard from "@/components/pricing/PricingCard";
import { useSubscriptionManagement } from "@/hooks/useSubscriptionManagement";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const Pricing = () => {
  const { toast } = useToast();
  const { isLoading: subscriptionLoading, handleSubscribe } = useSubscriptionManagement();

  const { data: prices, isLoading: pricesLoading, error } = useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      console.log('Fetching prices...');
      const { data, error } = await supabase
        .from('prices')
        .select('*')
        .eq('active', true)
        .order('unit_amount');
      
      if (error) {
        console.error('Error fetching prices:', error);
        toast({
          title: "Error",
          description: "Failed to load pricing information",
          variant: "destructive",
        });
        throw error;
      }
      
      console.log('Fetched prices:', data);
      return data;
    },
    retry: 3
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

  const LoadingSkeleton = () => (
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-6">
          <div className="rounded-lg border p-6 space-y-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-12 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
        <Header />
        <div className="container pt-24 px-4 py-12">
          <div className="text-center text-red-500">
            Failed to load pricing information. Please try again later.
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
        {(subscriptionLoading || pricesLoading) ? (
          <LoadingSkeleton />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Pricing;