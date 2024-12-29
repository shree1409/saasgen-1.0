import { Youtube, ExternalLink } from "lucide-react";
import { TechStackVideo } from "./types";

interface VideoCardProps {
  video: TechStackVideo;
}

const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 rounded-lg border hover:shadow-lg transition-shadow bg-card/50 flex flex-col gap-2"
    >
      <div className="flex items-center gap-2">
        <Youtube className="w-5 h-5 text-red-500" />
        <h3 className="font-semibold flex-1">{video.title}</h3>
        <ExternalLink className="w-4 h-4 text-gray-400" />
      </div>
      <p className="text-sm text-muted-foreground">
        {video.description}
      </p>
      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
        <Youtube className="w-3 h-3" />
        <span>Click to watch on YouTube</span>
      </div>
    </a>
  );
};

export default VideoCard;