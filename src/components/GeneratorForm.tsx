import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import StepIndicator from "./StepIndicator";
import FormButtons from "./form/FormButtons";
import FormStepContent from "./form/FormStepContent";
import { useFormState } from "./form/useFormState";
import { validateStep } from "./form/FormValidation";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const GeneratorForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hasSubscription, setHasSubscription] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

      // Check for active subscription
      const { data: subscription, error: subError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('is_active', true)
        .single();

      if (subError) {
        console.error('Error checking subscription:', subError);
        setHasSubscription(false);
        return;
      }

      setHasSubscription(!!subscription);
    };

    checkAuth();
  }, [navigate]);

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
    setError(null);
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
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
        .single();

      if (subError) {
        throw new Error('Failed to verify subscription status');
      }

      toast({
        title: "Generating your website idea",
        description: "We're crafting something unique for you...",
      });

      const { data, error: generateError } = await supabase.functions.invoke('generate-website-idea', {
        body: { 
          ...formData,
          subscriptionTier: subscription?.tier || 'basic'
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
          subscription_tier: subscription?.tier || 'basic'
        });

      if (insertError) {
        console.error('Error storing idea:', insertError);
        throw new Error('Failed to save your generated idea');
      }

      // Navigate based on subscription tier
      const tier = subscription?.tier || 'basic';
      navigate(`/${tier}`, { state: { generatedIdea: data.idea } });
      
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

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <StepIndicator currentStep={step} totalSteps={5} />
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
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