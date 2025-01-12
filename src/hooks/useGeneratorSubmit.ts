import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FormData } from "@/components/form/FormValidation";

export const useGeneratorSubmit = (setIsGenerating: (value: boolean) => void, setError: (value: string | null) => void) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    try {
      setError(null);
      setIsGenerating(true);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/sign-in');
        return;
      }

      // Get user's subscription tier
      const { data: subscription, error: subError } = await supabase
        .from('subscriptions')
        .select('tier')
        .eq('user_id', session.user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (subError) {
        console.error('Subscription verification error:', subError);
        throw new Error('Failed to verify subscription status');
      }

      if (!subscription) {
        console.error('No active subscription found');
        navigate('/pricing');
        return;
      }

      console.log('Generating idea with subscription tier:', subscription.tier);

      toast({
        title: "Generating your website idea",
        description: "We're crafting something unique for you...",
      });

      const { data, error: generateError } = await supabase.functions.invoke('generate-website-idea', {
        body: { 
          ...formData,
          subscriptionTier: subscription.tier
        },
      });

      if (generateError) {
        console.error('Generation error:', generateError);
        throw new Error('Failed to generate idea. Please try again.');
      }

      if (!data || !data.idea) {
        throw new Error('Invalid response format from idea generator');
      }

      // Store the generated idea
      const { error: insertError } = await supabase
        .from('generated_ideas')
        .insert({
          user_id: session.user.id,
          title: data.idea.websiteName,
          description: data.idea.description,
          features: data.idea.keyFeatures,
          tech_stack: data.idea.techStack,
          timeline_breakdown: data.idea.timelineBreakdown,
          market_potential: data.idea.marketPotential,
          monetization_strategies: data.idea.monetizationStrategy,
          subscription_tier: subscription.tier
        });

      if (insertError) {
        console.error('Error storing idea:', insertError);
        throw new Error('Failed to save your generated idea');
      }

      navigate(`/${subscription.tier}`, { state: { generatedIdea: data.idea } });
      
      toast({
        title: "Success!",
        description: "Your website idea has been generated.",
      });
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError(error.message || 'An unexpected error occurred. Please try again.');
      toast({
        title: "Error",
        description: error.message || "Failed to generate idea. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return { handleSubmit };
};