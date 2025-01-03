import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/landing/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const Pricing = () => {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Header />
      <div className="container px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Simple, transparent pricing</h1>
          <p className="text-lg text-muted-foreground mt-4">Choose the plan that's right for you</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {prices?.map((price) => (
            <Card key={price.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{price.tier}</CardTitle>
                <CardDescription>{price.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-3xl font-bold">
                  ${(price.unit_amount / 100).toFixed(2)}
                  <span className="text-sm font-normal text-muted-foreground">/{price.interval}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="default">
                  Get Started
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