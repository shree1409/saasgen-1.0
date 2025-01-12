import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/landing/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GeneratedIdea from "./GeneratedIdea";

const demoIdeas = {
  basic: {
    websiteName: "TaskFlow Basic",
    description: "A streamlined task management platform for individuals and small teams.",
    keyFeatures: [
      "Task creation and management",
      "Basic project organization",
      "Simple progress tracking",
      "Personal dashboard"
    ],
    monetizationStrategy: [
      "Freemium model with basic features",
      "Premium user upgrades"
    ],
    techStack: "React, Node.js, MongoDB",
    timelineBreakdown: "Month 1: Core features. Month 2: Testing and deployment.",
    marketPotential: "Growing demand for personal productivity tools."
  },
  advanced: {
    websiteName: "TeamSync Pro",
    description: "An advanced team collaboration platform with integrated project management tools.",
    keyFeatures: [
      "Real-time collaboration",
      "Advanced project tracking",
      "Team analytics",
      "Resource management",
      "Custom workflows"
    ],
    monetizationStrategy: [
      "Tiered subscription plans",
      "Team licensing",
      "Priority support packages"
    ],
    techStack: "React, Node.js, PostgreSQL, Redis, WebSocket",
    timelineBreakdown: "Month 1-2: Core platform. Month 3: Advanced features. Month 4: Analytics and reporting.",
    marketPotential: "High growth potential in the enterprise collaboration market with 30% YoY growth."
  },
  pro: {
    websiteName: "EnterpriseHub Elite",
    description: "A comprehensive enterprise solution for large-scale business operations and analytics.",
    keyFeatures: [
      "Enterprise-grade security",
      "Advanced analytics dashboard",
      "Custom integrations",
      "Automated workflows",
      "Multi-team management"
    ],
    monetizationStrategy: [
      "Enterprise licensing",
      "Custom development services",
      "White-label solutions",
      "Consulting services"
    ],
    techStack: "React, Node.js, PostgreSQL, Kubernetes, ElasticSearch, Redis",
    timelineBreakdown: "Month 1-2: Core platform. Month 3-4: Enterprise features. Month 5-6: Security and scaling.",
    marketPotential: "Enterprise software market growing at 35% annually, particularly strong in financial and healthcare sectors."
  }
};

const Pricing = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (session?.user) {
          const { data: subscriptions, error: subError } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', session.user.id)
            .eq('is_active', true)
            .maybeSingle();

          if (subError) throw subError;

          if (subscriptions) {
            toast({
              title: "Active Subscription",
              description: "Redirecting to generator...",
            });
            navigate('/generator');
            return;
          }
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
        toast({
          title: "Error",
          description: "Failed to check subscription status",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, [navigate, toast]);

  const { data: prices } = useQuery({
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
    },
    enabled: !isLoading,
  });

  const handleSubscribe = async (priceId: string) => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;

      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to subscribe to a plan",
        });
        navigate('/sign-in');
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { 
          priceId,
          returnUrl: `${window.location.origin}/generator`
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
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

  const getDescription = (price) => {
    switch (price.tier) {
      case 'pro':
        return "Everything in Advanced plus Market Analysis + Marketing Strategy Roadmap and Learning Resources";
      case 'advanced':
        return "Everything in Basic plus Technical Implementation, Development Timeline and Monetization Strategy";
      default:
        return "Generate website ideas with basic features and monetization suggestions";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
        <Header />
        <div className="container px-4 py-12 flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

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
            <div key={price.id} className="space-y-6">
              <Card className="hover:scale-105 transition-transform duration-300 bg-white/80 backdrop-blur-lg border-purple-100">
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
                    ${(price.unit_amount / 100).toFixed(2)}
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button 
                    className="w-full text-white bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary transition-all duration-300" 
                    onClick={() => handleSubscribe(price.stripe_price_id)}
                  >
                    Subscribe
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(`/${price.tier.toLowerCase()}`)}
                  >
                    View Demo
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
