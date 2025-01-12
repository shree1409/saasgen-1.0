import { Card } from "@/components/ui/card";
import IdeaTitle from "./header/IdeaTitle";
import KeyFeatures from "./KeyFeatures";
import TechnicalImplementation from "./TechnicalImplementation";
import MonetizationStrategy from "./MonetizationStrategy";
import MarketingSection from "./MarketingSection";
import LearningResources from "./learning-resources/LearningResources";

interface GeneratedIdeaProps {
  demoData: {
    websiteName: string;
    description: string;
    keyFeatures: string[];
    techStack: string;
    timelineBreakdown?: string;
    marketPotential?: string;
    monetizationStrategy?: string[];
    subscription_tier?: 'basic' | 'advanced' | 'pro';
  };
}

const GeneratedIdea = ({ demoData }: GeneratedIdeaProps) => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <IdeaTitle 
          websiteName={demoData.websiteName} 
          description={demoData.description} 
        />
      </Card>

      <Card className="p-6">
        <KeyFeatures features={demoData.keyFeatures} />
      </Card>

      {(demoData.subscription_tier === 'advanced' || demoData.subscription_tier === 'pro') && (
        <>
          <Card className="p-6">
            <TechnicalImplementation 
              techStack={demoData.techStack} 
              timelineBreakdown={demoData.timelineBreakdown || ''} 
            />
          </Card>

          <Card className="p-6">
            <MonetizationStrategy strategies={demoData.monetizationStrategy || []} />
          </Card>

          <Card className="p-6">
            <MarketingSection marketPotential={demoData.marketPotential || ''} />
          </Card>
        </>
      )}

      {demoData.subscription_tier === 'pro' && (
        <Card className="p-6">
          <LearningResources 
            techStack={demoData.techStack}
            features={demoData.keyFeatures}
          />
        </Card>
      )}
    </div>
  );
};

export default GeneratedIdea;