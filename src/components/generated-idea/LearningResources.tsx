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
    
    technologies.forEach(tech => {
      const matchingTech = Object.keys(techStackVideos).find(
        t => t.toLowerCase().includes(tech) || tech.includes(t.toLowerCase())
      );
      
      if (matchingTech) {
        videos.push(...techStackVideos[matchingTech]);
      }
    });
    
    return videos;
  };

  const videos = getRelevantVideos(techStack);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Youtube className="w-6 h-6 text-red-500" />
          Learning Resources
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))}
        </div>
        {videos.length === 0 && (
          <div className="text-center py-8 space-y-3">
            <Youtube className="w-12 h-12 text-red-500 mx-auto" />
            <p className="text-muted-foreground">
              Loading learning resources for {techStack}...
            </p>
          </div>
        )}
        <ProTip />
      </CardContent>
    </Card>
  );
};

export default LearningResources;