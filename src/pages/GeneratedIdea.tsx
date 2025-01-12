import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import KeyFeatures from "@/components/generated-idea/KeyFeatures";
import MonetizationStrategy from "@/components/generated-idea/MonetizationStrategy";
import TechnicalImplementation from "@/components/generated-idea/TechnicalImplementation";
import MarketingSection from "@/components/generated-idea/MarketingSection";
import LearningResources from "@/components/generated-idea/LearningResources";
import PageHeader from "@/components/generated-idea/header/PageHeader";
import IdeaTitle from "@/components/generated-idea/header/IdeaTitle";

interface GeneratedIdea {
  websiteName: string;
  description: string;
  keyFeatures: string[];
  monetizationStrategy: string[];
  techStack: string;
  timelineBreakdown: string;
  marketPotential: string;
}

interface GeneratedIdeaProps {
  demoData?: GeneratedIdea;
}

const GeneratedIdea = ({ demoData }: GeneratedIdeaProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [generatedIdea] = useState(demoData || location.state?.generatedIdea as GeneratedIdea);
  const [subscription, setSubscription] = useState<string | null>(null);

  useEffect(() => {
    // Only check subscription if not in demo mode
    if (!demoData) {
      const checkSubscription = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/sign-in');
          return;
        }

        const { data: sub } = await supabase
          .from('subscriptions')
          .select('tier')
          .eq('user_id', session.user.id)
          .eq('is_active', true)
          .single();

        setSubscription(sub?.tier || null);
      };

      checkSubscription();
    }
  }, [navigate, demoData]);

  if (!generatedIdea && !demoData) {
    navigate('/');
    return null;
  }

  // Ensure arrays have default values if undefined
  const safeIdea = {
    ...generatedIdea,
    keyFeatures: generatedIdea.keyFeatures || [],
    monetizationStrategy: generatedIdea.monetizationStrategy || [],
    techStack: generatedIdea.techStack || '',
    timelineBreakdown: generatedIdea.timelineBreakdown || '',
    marketPotential: generatedIdea.marketPotential || '',
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Share this idea with others",
      });
    } catch (err) {
      toast({
        title: "Failed to copy link",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [JSON.stringify(generatedIdea, null, 2)],
      { type: "application/json" }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${generatedIdea.websiteName.toLowerCase().replace(/\s+/g, '-')}-idea.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const renderContent = () => {
    const sections = [];

    // Basic content (available to all)
    sections.push(
      <motion.div key="basic" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <KeyFeatures features={safeIdea.keyFeatures} />
      </motion.div>,
      <motion.div key="technical" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <TechnicalImplementation techStack={safeIdea.techStack} timelineBreakdown={safeIdea.timelineBreakdown} />
      </motion.div>
    );

    // Show all content in demo mode or for advanced/pro subscribers
    if (demoData || subscription === 'advanced' || subscription === 'pro') {
      sections.push(
        <motion.div key="marketing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <MarketingSection marketPotential={safeIdea.marketPotential} />
        </motion.div>,
        <motion.div key="monetization" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <MonetizationStrategy strategies={safeIdea.monetizationStrategy} />
        </motion.div>
      );
    }

    // Show learning resources in demo mode or for pro subscribers
    if (demoData || subscription === 'pro') {
      sections.push(
        <motion.div key="learning" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <LearningResources techStack={safeIdea.techStack} />
        </motion.div>
      );
    }

    return sections;
  };

  return (
    <div className="container px-4 py-8 max-w-6xl">
      <PageHeader 
        onBack={() => navigate('/')}
        onShare={handleShare}
        onDownload={handleDownload}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="glass-panel rounded-2xl p-8 space-y-8">
          <IdeaTitle 
            websiteName={safeIdea.websiteName}
            description={safeIdea.description}
          />

          <div className="grid gap-8">
            {renderContent()}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GeneratedIdea;