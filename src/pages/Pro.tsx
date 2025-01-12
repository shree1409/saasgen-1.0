import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import KeyFeatures from "@/components/generated-idea/KeyFeatures";
import TechnicalImplementation from "@/components/generated-idea/TechnicalImplementation";
import MarketingSection from "@/components/generated-idea/MarketingSection";
import MonetizationStrategy from "@/components/generated-idea/MonetizationStrategy";
import LearningResources from "@/components/generated-idea/learning-resources/LearningResources";
import { useToast } from "@/components/ui/use-toast";

const Pro = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [generatedIdea] = useState(location.state?.generatedIdea);

  useEffect(() => {
    const checkSubscription = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/sign-in');
        return;
      }

      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('is_active', true)
        .single();

      if (!subscription || subscription.tier !== 'pro') {
        toast({
          title: "Subscription required",
          description: "Please subscribe to the Pro plan to view this content.",
        });
        navigate('/pricing');
      }
    };

    checkSubscription();
  }, [navigate, toast]);

  if (!generatedIdea) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12">
        <div className="container">
          <h1 className="text-2xl font-bold mb-4">No idea found</h1>
          <p>Please generate a new idea from the generator page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12">
      <div className="container space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{generatedIdea.websiteName}</h1>
          <p className="text-lg text-muted-foreground">{generatedIdea.description}</p>
        </div>
        
        <KeyFeatures features={generatedIdea.keyFeatures} />
        <TechnicalImplementation 
          techStack={generatedIdea.techStack} 
          timelineBreakdown={generatedIdea.timelineBreakdown} 
        />
        <MarketingSection marketPotential={generatedIdea.marketPotential} />
        <MonetizationStrategy strategies={generatedIdea.monetizationStrategy} />
        <LearningResources 
          techStack={generatedIdea.techStack}
          features={generatedIdea.keyFeatures}
        />
      </div>
    </div>
  );
};

export default Pro;