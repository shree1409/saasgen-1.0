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
  // For preview mode, we'll assume user has a basic subscription
  const [hasSubscription, setHasSubscription] = useState(true);
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

      // For preview mode, we'll skip the actual subscription check
      setHasSubscription(true);
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

      setIsGenerating(true);
      toast({
        title: "Generating your website idea",
        description: "We're crafting something unique for you...",
      });

      // For preview mode, we'll simulate a basic subscription
      const subscription = { tier: 'basic' };

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
          subscription_tier: 'basic'
        });

      if (insertError) {
        console.error('Error storing idea:', insertError);
        throw new Error('Failed to store generated idea');
      }

      // For preview mode, always navigate to basic view
      navigate('/basic', { state: { generatedIdea: data.idea } });
      
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