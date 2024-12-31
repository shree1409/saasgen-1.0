import { useState } from "react";
import { Youtube, ExternalLink } from "lucide-react";
import { TechStackVideo } from "./types";

interface VideoCardProps {
  video: TechStackVideo;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const [imageError, setImageError] = useState(false);

  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getVideoId(video.url);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;

  const handleImageError = () => {
    console.error("Failed to load thumbnail for video:", video.url);
    setImageError(true);
  };

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-lg border hover:shadow-lg transition-all bg-card/50 space-y-3"
    >
      {thumbnailUrl && !imageError ? (
        <div className="relative aspect-video rounded-lg overflow-hidden group">
          <img 
            src={thumbnailUrl} 
            alt={video.title}
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Youtube className="w-12 h-12 text-red-500" />
          </div>
        </div>
      ) : (
        <div className="aspect-video rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <Youtube className="w-12 h-12 text-red-500" />
        </div>
      )}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Youtube className="w-5 h-5 text-red-500 flex-shrink-0" />
          <h3 className="font-semibold flex-1">{video.title}</h3>
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </div>
        <p className="text-sm text-muted-foreground">
          {video.description}
        </p>
      </div>
    </a>
  );
};

export default VideoCard;