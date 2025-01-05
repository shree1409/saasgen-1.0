import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import StepIndicator from "./StepIndicator";
import FormButtons from "./form/FormButtons";
import FormStepContent from "./form/FormStepContent";
import { useFormState } from "./form/useFormState";
import { validateStep } from "./form/FormValidation";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const GeneratorForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hasSubscription, setHasSubscription] = useState(false);
  const {
    step,
    setStep,
    formData,
    isGenerating,
    setIsGenerating,
    updateFormData,
  } = useFormState();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/sign-in');
        return;
      }

      const { data: subscription, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (error) {
        console.error('Error checking subscription:', error);
        toast({
          title: "Error checking subscription",
          description: "Please try again later.",
          variant: "destructive",
        });
        return;
      }

      setHasSubscription(!!subscription);
    };

    checkAuth();
  }, [navigate, toast]);

  const handleNext = () => {
    if (!validateStep(step, formData)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/sign-in');
        return;
      }

      if (!hasSubscription) {
        navigate('/pricing');
        toast({
          title: "Subscription required",
          description: "Please subscribe to generate website ideas.",
        });
        return;
      }

      setIsGenerating(true);
      toast({
        title: "Generating your website idea",
        description: "We're crafting something unique for you...",
      });

      const { data: subscription, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('tier')
        .eq('user_id', session.user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (subscriptionError) {
        throw subscriptionError;
      }

      const { data, error } = await supabase.functions.invoke('generate-website-idea', {
        body: { ...formData, subscriptionTier: subscription?.tier || 'basic' },
      });

      if (error) throw error;

      // Store the generated idea in the database
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
          subscription_tier: subscription?.tier || 'basic'
        });

      if (insertError) {
        console.error('Error storing idea:', insertError);
        throw new Error('Failed to store generated idea');
      }

      // Redirect based on subscription tier
      if (subscription?.tier === 'basic') {
        navigate('/basic', { state: { generatedIdea: data.idea } });
      } else if (subscription?.tier === 'advanced') {
        navigate('/advanced', { state: { generatedIdea: data.idea } });
      } else {
        navigate('/generated-idea', { state: { generatedIdea: data.idea } });
      }
      
      toast({
        title: "Idea generated successfully!",
        description: "Here's your personalized website concept.",
      });
    } catch (error) {
      console.error('Error generating idea:', error);
      toast({
        title: "Error generating idea",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <StepIndicator currentStep={step} totalSteps={5} />
      
      <FormStepContent
        currentStep={step}
        formData={formData}
        updateFormData={updateFormData}
      />

      <FormButtons
        step={step}
        isGenerating={isGenerating}
        onBack={handleBack}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default GeneratorForm;