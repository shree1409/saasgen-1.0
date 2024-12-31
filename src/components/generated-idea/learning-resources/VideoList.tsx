import { TechStackVideo } from "./types";
import VideoCard from "./VideoCard";
import { Youtube, AlertCircle } from "lucide-react";

interface VideoListProps {
  videos: TechStackVideo[];
  techStack: string;
}

const VideoList = ({ videos, techStack }: VideoListProps) => {
  if (!techStack) {
    return (
      <div className="text-center py-8 space-y-3">
        <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto" />
        <p className="text-muted-foreground">
          No tech stack specified
        </p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-8 space-y-3">
        <Youtube className="w-12 h-12 text-red-500 mx-auto animate-pulse" />
        <p className="text-muted-foreground">
          Loading learning resources for {techStack}...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {videos.map((video, index) => (
        <VideoCard key={`${video.url}-${index}`} video={video} />
      ))}
    </div>
  );
};

export default VideoList;