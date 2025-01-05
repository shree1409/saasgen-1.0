import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/landing/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: prices, isLoading } = useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prices')
        .select('*')
        .eq('active', true)
        .order('unit_amount');
      
      if (error) throw error;
      return data;
    },
  });

  const handleSubscribe = async (priceId: string) => {
    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to subscribe to a plan",
        });
        navigate('/sign-in');
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { priceId },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to start checkout process",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
        <Header />
        <div className="container px-4 py-12 flex items-center justify-center">
          <div className="animate-pulse">Loading pricing plans...</div>
        </div>
      </div>
    );
  }

  const getDescription = (price) => {
    switch (price.tier) {
      case 'pro':
        return "Everything in Advanced plus Market Analysis + Marketing Strategy Roadmap and Learning Resources";
      case 'advanced':
        return "Everything in Basic plus Technical Implementation, Development Timeline and Monetization Strategy";
      default:
        return price.description;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Header />
      <div className="container px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-muted-foreground mt-4">
            Choose the plan that's right for you
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {prices?.map((price) => (
            <Card key={price.id} className="flex flex-col hover:scale-105 transition-transform duration-300 bg-white/80 backdrop-blur-lg border-purple-100">
              <CardHeader>
                <CardTitle className="capitalize bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {price.tier}
                </CardTitle>
                <CardDescription>
                  {getDescription(price)}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-3xl font-bold">
                  £{(price.unit_amount / 100).toFixed(2)}
                  <span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full text-white bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary transition-all duration-300" 
                  onClick={() => handleSubscribe(price.stripe_price_id)}
                >
                  Subscribe
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;