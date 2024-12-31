import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube } from "lucide-react";
import VideoList from "./learning-resources/VideoList";
import ProTip from "./learning-resources/ProTip";
import { useVideoMatcher } from "./learning-resources/useVideoMatcher";

interface LearningResourcesProps {
  techStack: string;
}

const LearningResources = ({ techStack }: LearningResourcesProps) => {
  const { getRelevantVideos } = useVideoMatcher(techStack);
  const videos = getRelevantVideos();

  console.log("Tech Stack:", techStack); // Debug log
  console.log("Found Videos:", videos); // Debug log

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Youtube className="w-6 h-6 text-red-500" />
          Learning Resources
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <VideoList videos={videos} techStack={techStack} />
        <ProTip />
      </CardContent>
    </Card>
  );
};

export default LearningResources;