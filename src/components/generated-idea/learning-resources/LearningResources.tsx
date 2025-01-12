import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube } from "lucide-react";
import VideoList from "./VideoList";
import ProTip from "./ProTip";
import { useVideoMatcher } from "./useVideoMatcher";

interface LearningResourcesProps {
  techStack: string;
  features?: string[];
}

const LearningResources = ({ techStack, features }: LearningResourcesProps) => {
  const { videos, isLoading } = useVideoMatcher(techStack);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Youtube className="w-6 h-6 text-red-500" />
          Learning Resources
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <VideoList 
          videos={videos} 
          techStack={techStack} 
          isLoading={isLoading} 
        />
        <ProTip />
      </CardContent>
    </Card>
  );
};

export default LearningResources;