import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube } from "lucide-react";
import VideoCard from "./learning-resources/VideoCard";
import ProTip from "./learning-resources/ProTip";
import { techStackVideos, TechStackVideo } from "./learning-resources/types";

interface LearningResourcesProps {
  techStack: string;
}

const LearningResources = ({ techStack }: LearningResourcesProps) => {
  const getRelevantVideos = (techStack: string) => {
    const technologies = techStack.toLowerCase().split(/[,\s]+/);
    const videos: TechStackVideo[] = [];
    
    Object.entries(techStackVideos).forEach(([tech, techVideos]) => {
      if (technologies.some(t => tech.toLowerCase().includes(t))) {
        videos.push(...techVideos);
      }
    });
    
    return videos;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Youtube className="w-6 h-6 text-red-500" />
          Learning Resources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getRelevantVideos(techStack).map((video, index) => (
            <VideoCard key={index} video={video} />
          ))}
        </div>
        <ProTip />
      </CardContent>
    </Card>
  );
};

export default LearningResources;